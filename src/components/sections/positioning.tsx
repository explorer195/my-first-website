import { CountUp } from "@/components/motion/count-up";
import { RevealItem, RevealList } from "@/components/motion/reveal";
import { ScrubText } from "@/components/motion/scrub-text";
import { Container } from "@/components/ui/container";
import { ScopeDot } from "@/components/ui/scope-dot";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { divisions } from "@/content/divisions";
import { markets } from "@/content/markets";
import { cn } from "@/lib/cn";
import { type } from "@/lib/typography";

const facts = [
  { value: divisions.length, label: "Specialist divisions", detail: "From SEO to software, organized A to Z." },
  {
    value: markets.length,
    label: "Markets",
    detail: "Across North America, Europe, the Gulf and Asia-Pacific.",
  },
  { value: 1, label: "Accountable team", detail: "One plan and one point of contact, from strategy to software." },
];

export function Positioning() {
  return (
    <Section tone="night" labelledBy="positioning-title">
      <Container>
        <div className="grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-3">
            <SectionLabel number="01">Positioning</SectionLabel>
            <h2 id="positioning-title" className={cn(type.label, "mt-4 text-muted lg:mt-6")}>
              Not a traditional agency
            </h2>
          </div>
          <ScrubText
            className="col-span-4 mt-8 font-display text-3xl leading-[1.12] font-semibold tracking-tight text-balance font-stretch-semi-expanded md:col-span-8 md:text-4xl lg:col-span-9 lg:mt-0 lg:text-5xl"
            text="Search is no longer one box. Customers search on Google, ask ChatGPT, compare on Perplexity and book through a chatbot at midnight. We build the visibility, intelligence and technology to win every one of those moments"
            after={<ScopeDot />}
          />
        </div>

        <RevealList
          as="ul"
          className="mt-16 grid grid-cols-4 border-t border-border md:mt-24 md:grid-cols-8 lg:grid-cols-12"
        >
          {facts.map((fact, index) => (
            <RevealItem
              key={fact.label}
              as="li"
              className={cn(
                "col-span-4 flex items-start gap-6 border-b border-border py-8 md:col-span-8 md:gap-8 lg:col-span-9 lg:col-start-4",
              )}
            >
              <span className={cn(type.label, "mt-4 w-8 shrink-0 text-muted")}>0{index + 1}</span>
              <CountUp
                to={fact.value}
                className="w-24 shrink-0 font-display text-5xl leading-none font-bold tracking-tight font-stretch-expanded md:w-40 md:text-7xl"
              />
              <span className="flex flex-col gap-2 pt-2 md:flex-row md:items-baseline md:gap-8">
                <span className={cn(type.subheading, "md:w-64 md:shrink-0")}>{fact.label}</span>
                <span className={type.small}>{fact.detail}</span>
              </span>
            </RevealItem>
          ))}
        </RevealList>
      </Container>
    </Section>
  );
}
