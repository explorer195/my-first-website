import { ClipReveal } from "@/components/motion/clip-reveal";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { searchLayers } from "@/content/search-stack";
import { cn } from "@/lib/cn";
import { type } from "@/lib/typography";
import { SearchStackScroller } from "./search-stack-scroller";

export function SearchStack() {
  return (
    // The night tone shows around the paper panel while it widens into place.
    <section id="ai-search" data-tone="night" aria-labelledby="ai-search-title">
      <ClipReveal>
        <div data-tone="paper" className="py-16 md:py-24 lg:py-32">
          <Container>
            <div className="grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12">
              <SectionLabel number="02" className="col-span-4 md:col-span-8 lg:col-span-12">
                Search, rebuilt for AI
              </SectionLabel>
              <h2
                id="ai-search-title"
                className={cn(type.display, "col-span-4 mt-4 md:col-span-8 lg:col-span-8 lg:mt-6")}
              >
                Be the answer, wherever the question is asked.
              </h2>
              <p
                className={cn(
                  type.lead,
                  "col-span-4 mt-6 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:mt-6 lg:self-end",
                )}
              >
                SEO, AEO, GEO and AI search optimization are separate disciplines with separate
                deliverables. We run them as one coordinated program.
              </p>
            </div>

            <SearchStackScroller layers={searchLayers} />

            <p className="mt-16 flex max-w-2xl items-start gap-4 border-t border-border pt-8 text-sm leading-relaxed text-muted lg:mt-24">
              <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-signal" />
              Generative search is still evolving. We measure and report on evidence, such as
              citations, mentions and answer visibility, and we never promise guaranteed AI
              rankings.
            </p>
          </Container>
        </div>
      </ClipReveal>
    </section>
  );
}
