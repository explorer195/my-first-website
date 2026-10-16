import { RevealItem, RevealList } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { ScopeDot } from "@/components/ui/scope-dot";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { engagementModels, principles } from "@/content/approach";
import { cn } from "@/lib/cn";
import { type } from "@/lib/typography";

export function Approach() {
  return (
    <Section id="approach" tone="paper" labelledBy="approach-title">
      <Container>
        <div className="grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionLabel number="06">How we work</SectionLabel>
              <h2 id="approach-title" className={cn(type.display, "mt-4 lg:mt-6")}>
                Evidence over promises<ScopeDot />
              </h2>
              <p className={cn(type.lead, "mt-6 max-w-sm")}>
                Clear metrics, honest reporting and systems built to keep working after launch.
              </p>
            </div>
          </div>

          <RevealList as="ol" className="col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
            {principles.map((principle, index) => (
              <RevealItem
                key={principle.title}
                as="li"
                className="grid grid-cols-4 gap-x-6 border-t border-border py-8 md:grid-cols-7 md:py-12"
              >
                <span
                  aria-hidden
                  className="text-outline col-span-1 font-display text-5xl leading-none font-bold text-foreground/40 font-stretch-expanded md:col-span-2 md:text-7xl"
                >
                  0{index + 1}
                </span>
                <div className="col-span-3 md:col-span-5">
                  <h3 className={type.heading}>{principle.title}</h3>
                  <p className={cn(type.body, "mt-4 max-w-md text-muted md:text-lg")}>{principle.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealList>
        </div>

        <div className="mt-16 md:mt-24 lg:mt-32">
          <h3 className={cn(type.label, "text-muted")}>Ways to work with us</h3>
          <RevealList as="ul" stagger={0.06} className="mt-6 border-t border-foreground">
            {engagementModels.map((model, index) => (
              <RevealItem
                key={model.name}
                as="li"
                className="group grid grid-cols-4 items-baseline gap-x-6 gap-y-2 border-b border-border py-6 transition-colors duration-300 hover:bg-foreground/5 md:grid-cols-8 md:py-8 lg:grid-cols-12"
              >
                <span className="col-span-1 font-mono text-xs text-muted md:col-span-1">
                  0{index + 1}
                </span>
                <span className={cn(type.subheading, "col-span-3 md:col-span-3 lg:col-span-4")}>
                  {model.name}
                </span>
                <span className="col-span-3 col-start-2 text-muted md:col-span-4 md:col-start-auto lg:col-span-6">
                  {model.body}
                </span>
              </RevealItem>
            ))}
          </RevealList>
        </div>
      </Container>
    </Section>
  );
}
