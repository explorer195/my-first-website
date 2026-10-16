"use client";

import { useState } from "react";
import { RevealItem, RevealList } from "@/components/motion/reveal";
import { additionalMarkets, primaryMarkets } from "@/content/markets";
import { cn } from "@/lib/cn";
import { type } from "@/lib/typography";
import { WorldMap } from "./world-map";

/** The map and market lists; hovering a market highlights it on the map. */
export function MarketsExplorer() {
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const hover = (code: string) => ({
    onPointerEnter: () => setHighlighted(code),
    onPointerLeave: () => setHighlighted(null),
  });

  return (
    <>
      <div className="-mx-4 mt-12 md:mx-0 md:mt-16 lg:mt-24">
        <WorldMap highlighted={highlighted} />
      </div>

      <div className="mt-12 grid grid-cols-4 gap-x-6 gap-y-12 border-t border-border pt-8 md:mt-16 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4 md:col-span-8 lg:col-span-6">
          <h3 className={cn(type.label, "text-muted")}>Primary markets</h3>
          <RevealList as="ul" className="mt-6 grid grid-cols-2 gap-x-6 md:grid-cols-3">
            {primaryMarkets.map((market) => (
              <RevealItem key={market.code} as="li">
                <span
                  {...hover(market.code)}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-4"
                >
                  <span className={type.subheading}>{market.label}</span>
                  <span className="font-mono text-xs text-muted">{market.code}</span>
                </span>
              </RevealItem>
            ))}
          </RevealList>
        </div>

        <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
          <h3 className={cn(type.label, "text-muted")}>Additional markets</h3>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {additionalMarkets.map((market) => (
              <li key={market.code}>
                <span
                  {...hover(market.code)}
                  className="flex items-baseline justify-between gap-2 border-b border-border py-2 text-sm"
                >
                  {market.name}
                  <span className="font-mono text-xs text-muted">{market.code}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
