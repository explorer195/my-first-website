import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScopeDot } from "@/components/ui/scope-dot";
import { cn } from "@/lib/cn";
import { contactLinks } from "@/lib/site";
import { type } from "@/lib/typography";
import { GlobePoster } from "./globe-poster";
import { HeroGlobe } from "./hero-globe";

const lines = ["Grow brands", "Generate leads", "Scale globally"];

export function Hero() {
  return (
    <section
      id="top"
      data-tone="night"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      <HeroGlobe poster={<GlobePoster />} />

      <Container className="relative">
        <div
          data-hero-content
          className="flex min-h-svh flex-col justify-end gap-10 pt-24 pb-8 md:gap-12 md:pb-12 lg:justify-between lg:pt-36"
        >
          <div>
            <p className={cn(type.label, "animate-fade text-muted")}>
              Digital growth <span className="text-signal">·</span> AI{" "}
              <span className="text-signal">·</span> Technology
            </p>
            {/* CSS animation, so the headline reveals before any JavaScript loads. */}
            <h1 id="hero-title" className={cn(type.hero, "mt-6 md:mt-8")}>
              {lines.map((line, index) => {
                const delay = { animationDelay: `${120 + index * 110}ms` };
                return (
                  <span key={line} className="relative -mb-[0.1em] block overflow-hidden pb-[0.1em]">
                    <span className="block animate-rise motion-reduce:animate-none" style={delay}>
                      {line}
                      <ScopeDot />
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 animate-shutter bg-background motion-reduce:hidden"
                      style={delay}
                    />
                  </span>
                );
              })}
            </h1>
          </div>

          <div className="grid grid-cols-4 items-end gap-8 md:grid-cols-8 lg:grid-cols-12">
            <div
              className="col-span-4 animate-fade md:col-span-6 lg:col-span-5"
              style={{ animationDelay: "650ms" }}
            >
              <p className={cn(type.lead, "max-w-md")}>
                A global growth, AI and technology company. We make brands visible wherever
                customers search and ask, then build the AI and software that turn attention into
                revenue.
              </p>
              <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                <Magnetic>
                  <Button
                    href={contactLinks.strategyCall}
                    size="lg"
                    icon={ArrowUpRight}
                    iconMotion="up-right"
                    className="w-full md:w-auto"
                  >
                    Book a strategy call
                  </Button>
                </Magnetic>
                <ArrowLink href="#index" icon={ArrowDown} className="whitespace-nowrap">
                  Explore the A–Z
                </ArrowLink>
              </div>
            </div>

            <div
              aria-hidden
              className="hidden animate-fade items-center justify-end gap-4 lg:col-span-3 lg:col-start-10 lg:flex"
              style={{ animationDelay: "1100ms" }}
            >
              <span className={cn(type.label, "text-muted")}>Scroll</span>
              <span className="scroll-cue relative block h-12 w-px overflow-hidden bg-border" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
