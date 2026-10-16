import { markets } from "@/content/markets";
import { isLand } from "@/lib/geo/land-mask";

// Same view as the 3D globe's opening frame (see globe-scene.tsx).
const VIEW_LON = 18;
const VIEW_TILT = 0.36;
const DEG = Math.PI / 180;
const SAMPLES = 9000;

type Vec = [number, number, number];

function latLonToVec(lat: number, lon: number): Vec {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return [-Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)];
}

/** Rotates like the 3D scene: spin around Y to face VIEW_LON, then tilt around X. */
function toView([x, y, z]: Vec): Vec {
  const yaw = -Math.PI / 2 - VIEW_LON * DEG;
  const x1 = x * Math.cos(yaw) + z * Math.sin(yaw);
  const z1 = -x * Math.sin(yaw) + z * Math.cos(yaw);
  const y2 = y * Math.cos(VIEW_TILT) - z1 * Math.sin(VIEW_TILT);
  const z2 = y * Math.sin(VIEW_TILT) + z1 * Math.cos(VIEW_TILT);
  return [x1, y2, z2];
}

const round = (n: number) => Math.round(n * 1000) / 1000;

/** Front-facing land dots, split into three depth bands for a soft limb. */
function buildPaths() {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const marketVecs = markets.map((m) => latLonToVec(m.lat, m.lon));
  const bands = ["", "", ""];
  let gold = "";
  for (let i = 0; i < SAMPLES; i++) {
    const y = 1 - ((i + 0.5) / SAMPLES) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    const v: Vec = [Math.cos(t) * r, y, Math.sin(t) * r];
    const lat = 90 - Math.acos(Math.max(-1, Math.min(1, v[1]))) / DEG;
    let lon = Math.atan2(v[2], -v[0]) / DEG - 180;
    if (lon < -180) lon += 360;
    if (lat < -58 || !isLand(lat, lon)) continue;

    const [px, py, pz] = toView(v);
    if (pz < 0.05) continue;
    const segment = `M${round(px)} ${round(-py)}h0`;

    const nearest = Math.max(...marketVecs.map((m) => m[0] * v[0] + m[1] * v[1] + m[2] * v[2]));
    // Deterministic "city lights": denser around the company's markets.
    const hash = ((i * 2654435761) >>> 0) / 4294967296;
    if (hash < (nearest > 0.992 ? 0.35 : nearest > 0.97 ? 0.08 : 0.012)) gold += segment;
    else bands[pz > 0.6 ? 0 : pz > 0.3 ? 1 : 2] += segment;
  }
  return { bands, gold };
}

/**
 * Static dotted globe matching the 3D globe's first frame. Shown when the
 * device can't run the 3D scene (for example, no graphics acceleration).
 */
export function GlobePoster() {
  const { bands, gold } = buildPaths();
  return (
    <svg viewBox="-1 -1 2 2" aria-hidden className="absolute inset-0 size-full" fill="none" strokeLinecap="round">
      <path d={bands[0]} className="stroke-highlight" strokeWidth="0.011" strokeOpacity="0.55" />
      <path d={bands[1]} className="stroke-highlight" strokeWidth="0.01" strokeOpacity="0.35" />
      <path d={bands[2]} className="stroke-highlight" strokeWidth="0.009" strokeOpacity="0.18" />
      <path d={gold} className="stroke-signal" strokeWidth="0.013" />
    </svg>
  );
}
