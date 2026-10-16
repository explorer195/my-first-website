"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { marketByCode, marketRoutes, markets } from "@/content/markets";
import { cn } from "@/lib/cn";
import { isLand } from "@/lib/geo/land-mask";
import { useIsClient } from "@/lib/use-is-client";

// Equirectangular projection, cropped to the inhabited latitudes.
const WIDTH = 1000;
const NORTH = 78;
const SOUTH = -56;
const HEIGHT = (WIDTH * (NORTH - SOUTH)) / 360;
const STEP = 2;

function project(lat: number, lon: number) {
  return { x: ((lon + 180) / 360) * WIDTH, y: ((NORTH - lat) / (NORTH - SOUTH)) * HEIGHT };
}

/** All land dots as a single path of zero-length round-capped segments. */
function buildLandPath() {
  let d = "";
  for (let lat = NORTH - STEP / 2; lat > SOUTH; lat -= STEP) {
    for (let lon = -180 + STEP / 2; lon < 180; lon += STEP) {
      if (!isLand(lat, lon)) continue;
      const { x, y } = project(lat, lon);
      d += `M${x.toFixed(1)} ${y.toFixed(1)}h0`;
    }
  }
  return d;
}

function routePath(from: string, to: string) {
  const a = marketByCode[from];
  const b = marketByCode[to];
  const p1 = project(a.lat, a.lon);
  const p2 = project(b.lat, b.lon);
  const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  const cx = (p1.x + p2.x) / 2;
  const cy = (p1.y + p2.y) / 2 - dist * 0.28;
  return `M${p1.x.toFixed(1)} ${p1.y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
}

// Label placement for primary markets, so neighboring labels never collide.
const labelPlacement: Record<string, { x: number; y: number; anchor: "start" | "end" }> = {
  US: { x: -12, y: 20, anchor: "end" },
  CA: { x: -12, y: -10, anchor: "end" },
  GB: { x: 10, y: -10, anchor: "start" },
  AE: { x: 12, y: 18, anchor: "start" },
  SA: { x: -12, y: 20, anchor: "end" },
  AU: { x: 12, y: -8, anchor: "start" },
};
const defaultPlacement = { x: 10, y: -8, anchor: "start" as const };

type WorldMapProps = {
  highlighted: string | null;
  className?: string;
};

export function WorldMap({ highlighted, className }: WorldMapProps) {
  const isClient = useIsClient();
  const reduceMotion = usePrefersReducedMotion();
  const land = useMemo(() => (isClient ? buildLandPath() : ""), [isClient]);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT.toFixed(1)}`}
      aria-hidden
      className={cn("h-auto w-full overflow-visible", className)}
    >
      <motion.path
        d={land}
        className="stroke-muted"
        strokeWidth="2.4"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: land ? 0.55 : 0 }}
        transition={{ duration: 1.2 }}
      />

      {marketRoutes.map(([from, to], index) => (
        <motion.path
          key={`${from}-${to}`}
          d={routePath(from, to)}
          fill="none"
          className="stroke-highlight"
          strokeWidth="1"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.6, delay: 0.3 + index * 0.08, ease: [0.65, 0, 0.35, 1] }
          }
        />
      ))}

      {markets.map((market) => {
        const { x, y } = project(market.lat, market.lon);
        const primary = market.tier === "primary";
        const isHighlighted = highlighted === market.code;
        return (
          <g key={market.code} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
            {primary && (
              <circle r="10" className="map-pulse fill-none stroke-signal" strokeWidth="1" />
            )}
            <circle
              r={isHighlighted ? 7 : primary ? 4.5 : 3}
              className={cn(
                "transition-all duration-300",
                primary || isHighlighted ? "fill-signal" : "fill-foreground",
              )}
            />
            {(primary || isHighlighted) && (
              <text
                x={(labelPlacement[market.code] ?? defaultPlacement).x}
                y={(labelPlacement[market.code] ?? defaultPlacement).y}
                textAnchor={(labelPlacement[market.code] ?? defaultPlacement).anchor}
                fontSize="11"
                className={cn(
                  "fill-foreground font-mono tracking-widest uppercase",
                  isHighlighted ? "block" : "hidden md:block",
                )}
              >
                {market.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
