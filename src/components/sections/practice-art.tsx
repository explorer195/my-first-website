import { DrawOnView } from "@/components/motion/draw-on-view";
import type { PracticeId } from "@/content/practices";

/** Rounds coordinates so server and browser produce identical markup. */
const r = (n: number) => Math.round(n * 100) / 100;

/** Stagger for the `draw` utility, in seconds. */
const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as React.CSSProperties;

function Target({ x, y }: { x: number; y: number }) {
  return (
    <>
      <circle cx={x} cy={y} r="14" className="stroke-signal" />
      <circle cx={x} cy={y} r="5" className="fill-signal stroke-none" />
    </>
  );
}

function Visibility() {
  const ticks = Array.from({ length: 24 }, (_, i) => (i * Math.PI * 2) / 24);
  const tickPath = ticks
    .map((a) => `M${r(200 + Math.cos(a) * 176)} ${r(200 + Math.sin(a) * 176)}L${r(200 + Math.cos(a) * 188)} ${r(200 + Math.sin(a) * 188)}`)
    .join("");
  return (
    <>
      {[176, 128, 80, 32].map((radius, i) => (
        <circle key={radius} cx="200" cy="200" r={radius} pathLength={1} className="draw" style={delay(i * 0.12)} />
      ))}
      <path d="M20 200H160M240 200H380M200 20V160M200 240V380" pathLength={1} className="draw" style={delay(0.4)} />
      <path d={tickPath} pathLength={1} className="draw" style={delay(0.6)} />
      <path d="M200 200L272 128" pathLength={1} className="draw" style={delay(0.9)} />
      <Target x={272} y={128} />
    </>
  );
}

function Growth() {
  const bars = [300, 280, 250, 230, 190, 150, 120];
  return (
    <>
      <path d="M30 340H370M30 340V40" pathLength={1} className="draw" />
      {bars.map((y, i) => (
        <path key={i} d={`M${70 + i * 44} 340V${y}`} pathLength={1} className="draw" style={delay(0.2 + i * 0.08)} />
      ))}
      <path d="M40 320C140 310 190 250 240 190S320 80 352 64" pathLength={1} className="draw" style={delay(0.5)} />
      <Target x={352} y={64} />
    </>
  );
}

function Intelligence() {
  const inner = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI * 2) / 6 - Math.PI / 2;
    return [r(200 + Math.cos(a) * 104), r(200 + Math.sin(a) * 104)] as const;
  });
  const outer = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI * 2) / 6 - Math.PI / 2 + Math.PI / 6;
    return [r(200 + Math.cos(a) * 172), r(200 + Math.sin(a) * 172)] as const;
  });
  return (
    <>
      {inner.map(([x, y], i) => (
        <path key={`s${i}`} d={`M200 200L${x} ${y}`} pathLength={1} className="draw" style={delay(i * 0.06)} />
      ))}
      {outer.map(([x, y], i) => {
        const [ax, ay] = inner[i];
        const [bx, by] = inner[(i + 1) % 6];
        return (
          <path
            key={`o${i}`}
            d={`M${ax} ${ay}L${x} ${y}L${bx} ${by}`}
            pathLength={1}
            className="draw"
            style={delay(0.4 + i * 0.06)}
          />
        );
      })}
      {[...inner, ...outer].map(([x, y], i) => (
        <circle key={`n${i}`} cx={x} cy={y} r="7" pathLength={1} className="draw" style={delay(0.3 + i * 0.04)} />
      ))}
      <circle cx="200" cy="200" r="18" className="stroke-signal" />
      <circle cx="200" cy="200" r="6" className="fill-signal stroke-none" />
    </>
  );
}

function Engineering() {
  const layer = (y: number) => `M200 ${y - 64}L328 ${y}L200 ${y + 64}L72 ${y}Z`;
  return (
    <>
      {[296, 216, 136].map((y, i) => (
        <path key={y} d={layer(y)} pathLength={1} className="draw" style={delay(i * 0.18)} />
      ))}
      <path d="M72 136V296M328 136V296M200 200V360" pathLength={1} className="draw" style={delay(0.5)} />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${104 + i * 32} ${120 + i * 16}L${232 + i * 32} ${56 + i * 16}`}
          pathLength={1}
          className="draw"
          style={delay(0.7 + i * 0.06)}
        />
      ))}
      <Target x={200} y={72} />
    </>
  );
}

const art: Partial<Record<PracticeId, () => React.ReactNode>> = {
  visibility: Visibility,
  growth: Growth,
  intelligence: Intelligence,
  engineering: Engineering,
};

/** Hairline illustration for each practice; strokes draw in when visible. */
export function PracticeArt({ id, className }: { id: PracticeId; className?: string }) {
  const Art = art[id];
  if (!Art) return null;
  return (
    <DrawOnView className={className}>
      <Art />
    </DrawOnView>
  );
}
