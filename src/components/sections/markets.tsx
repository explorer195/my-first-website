import { Container } from "@/components/ui/container";
import { ScopeDot } from "@/components/ui/scope-dot";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/cn";
import { type } from "@/lib/typography";
import { MarketsExplorer } from "./markets-explorer";

export function Markets() {
  return (
    <Section id="markets" tone="night" labelledBy="markets-title" className="overflow-hidden">
      <Container>
        <div className="grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12">
          <SectionLabel number="05" className="col-span-4 md:col-span-8 lg:col-span-12">
            Markets
          </SectionLabel>
          <h2
            id="markets-title"
            className={cn(type.display, "col-span-4 mt-4 md:col-span-8 lg:col-span-7 lg:mt-6")}
          >
            Local relevance. Global scale<ScopeDot />
          </h2>
          <p
            className={cn(
              type.lead,
              "col-span-4 mt-6 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end",
            )}
          >
            Market-specific strategy, landing pages and offers for 20 countries, prioritized by
            demand and operational feasibility.
          </p>
        </div>
        <MarketsExplorer />
      </Container>
    </Section>
  );
}
