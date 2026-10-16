import * as THREE from "three";
import { isLand } from "@/lib/geo/land-mask";
import { marketByCode, marketRoutes, markets } from "@/content/markets";

const DEG = Math.PI / 180;

/** Converts latitude/longitude in degrees to a point on a sphere. */
export function latLonToVector3(lat: number, lon: number, radius = 1, target = new THREE.Vector3()) {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return target.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function vectorToLatLon(v: THREE.Vector3) {
  const lat = 90 - Math.acos(THREE.MathUtils.clamp(v.y, -1, 1)) / DEG;
  let lon = Math.atan2(v.z, -v.x) / DEG - 180;
  if (lon < -180) lon += 360;
  return { lat, lon };
}

/** Rotation around Y that turns the given longitude toward the camera. */
export function rotationToFace(lon: number) {
  return -Math.PI / 2 - lon * DEG;
}

/** Small deterministic random generator, so the globe looks the same on every visit. */
function seededRandom(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Dots evenly spread over the land masses. Dots near the company's markets
 * are more likely to glow gold, like city lights.
 */
export function buildLandDots(samples: number, radius: number, viewLon: number) {
  const random = seededRandom(11);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const marketVectors = markets.map((m) => latLonToVector3(m.lat, m.lon, 1));
  const point = new THREE.Vector3();

  const position: number[] = [];
  const size: number[] = [];
  const gold: number[] = [];
  const delay: number[] = [];
  const twinkle: number[] = [];

  for (let i = 0; i < samples; i++) {
    const y = 1 - ((i + 0.5) / samples) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    point.set(Math.cos(theta) * r, y, Math.sin(theta) * r);
    const { lat, lon } = vectorToLatLon(point);
    if (lat < -58 || !isLand(lat, lon)) continue;

    let nearest = -1;
    for (const mv of marketVectors) nearest = Math.max(nearest, point.dot(mv));
    const cityChance = nearest > 0.988 ? 0.6 : nearest > 0.96 ? 0.2 : 0.022;
    const isGold = random() < cityChance ? 1 : 0;

    position.push(point.x * radius, point.y * radius, point.z * radius);
    gold.push(isGold);
    size.push(isGold ? 1.5 + random() * 1.3 : 0.9 + random() * 0.5);
    // Lights switch on from east to west, like dusk crossing the planet.
    const relative = (((viewLon - lon + 540) % 360) / 360);
    delay.push(0.04 + relative * 0.5 + random() * 0.12 + isGold * 0.1);
    twinkle.push(random());
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(position, 3));
  geometry.setAttribute("aSize", new THREE.Float32BufferAttribute(size, 1));
  geometry.setAttribute("aGold", new THREE.Float32BufferAttribute(gold, 1));
  geometry.setAttribute("aDelay", new THREE.Float32BufferAttribute(delay, 1));
  geometry.setAttribute("aTwinkle", new THREE.Float32BufferAttribute(twinkle, 1));
  return geometry;
}

/** One glowing node per market; primary markets are larger and pulse. */
export function buildMarketNodes(radius: number) {
  const position: number[] = [];
  const primary: number[] = [];
  const phase: number[] = [];
  const v = new THREE.Vector3();
  markets.forEach((m, i) => {
    latLonToVector3(m.lat, m.lon, radius, v);
    position.push(v.x, v.y, v.z);
    primary.push(m.tier === "primary" ? 1 : 0);
    phase.push((i * 0.37) % 1);
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(position, 3));
  geometry.setAttribute("aPrimary", new THREE.Float32BufferAttribute(primary, 1));
  geometry.setAttribute("aPhase", new THREE.Float32BufferAttribute(phase, 1));
  return geometry;
}

function slerp(a: THREE.Vector3, b: THREE.Vector3, t: number, target: THREE.Vector3) {
  const angle = a.angleTo(b);
  if (angle < 1e-5) return target.copy(a);
  const s = Math.sin(angle);
  return target
    .copy(a)
    .multiplyScalar(Math.sin((1 - t) * angle) / s)
    .addScaledVector(b, Math.sin(t * angle) / s);
}

/** Arcs between connected markets, lifted above the surface. */
export function buildRoutes(radius: number, segments = 72) {
  const position: number[] = [];
  const progress: number[] = [];
  const offset: number[] = [];
  const speed: number[] = [];
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const p = new THREE.Vector3();
  const prev = new THREE.Vector3();

  marketRoutes.forEach(([from, to], routeIndex) => {
    const m1 = marketByCode[from];
    const m2 = marketByCode[to];
    latLonToVector3(m1.lat, m1.lon, 1, a);
    latLonToVector3(m2.lat, m2.lon, 1, b);
    const height = 0.04 + a.angleTo(b) * 0.16;
    const routeOffset = (routeIndex * 0.29) % 1;
    const routeSpeed = 0.16 + ((routeIndex * 0.13) % 0.12);

    for (let s = 0; s <= segments; s++) {
      const t = s / segments;
      slerp(a, b, t, p).multiplyScalar(radius * (1 + height * Math.sin(Math.PI * t)));
      if (s > 0) {
        position.push(prev.x, prev.y, prev.z, p.x, p.y, p.z);
        progress.push((s - 1) / segments, t);
        offset.push(routeOffset, routeOffset);
        speed.push(routeSpeed, routeSpeed);
      }
      prev.copy(p);
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(position, 3));
  geometry.setAttribute("aProgress", new THREE.Float32BufferAttribute(progress, 1));
  geometry.setAttribute("aOffset", new THREE.Float32BufferAttribute(offset, 1));
  geometry.setAttribute("aSpeed", new THREE.Float32BufferAttribute(speed, 1));
  return geometry;
}

/** Points spaced along the orbit; the shader turns them into the comet's trail. */
export function buildTrail(count: number) {
  const index = new Float32Array(count);
  for (let i = 0; i < count; i++) index[i] = i / (count - 1);
  const geometry = new THREE.BufferGeometry();
  // Positions are computed in the shader; this attribute only sets the count.
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute("aIndex", new THREE.BufferAttribute(index, 1));
  return geometry;
}
