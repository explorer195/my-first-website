import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScopeDot } from "@/components/ui/scope-dot";
import { SectionLabel } from "@/components/ui/section-label";
import { divisionsFor } from "@/content/divisions";
import { practices, type Practice } from "@/content/practices";
import { cn } from "@/lib/cn";
import { contactLinks } from "@/lib/site";
import { type } from "@/lib/typography";
import { PracticeArt } from "./practice-art";
import { PracticesTrack } from "./practices-track";

const core = practices.filter((p) => p.id !== "strategy");
const strategy = practices.find((p) => p.id === "strategy")!;

function LetterLinks({ practice }: { practice: Practice }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={`${practice.name} divisions`}>
      {divisionsFor(practice.id).map((division) => (
        <li key={division.letter}>
          <a
            href={`#division-${division.letter.toLowerCase()}`}
            aria-label={`${division.letter}: ${division.name}`}
            title={division.name}
            className="flex size-12 items-center justify-center border border-border font-mono text-sm transition-colors duration-300 hover:border-signal hover:text-signal"
          >
            {division.letter}
          </a>
        </li>
      ))}
    </ul>
  );
}

function PracticePanel({ practice }: { practice: Practice }) {
  return (
    <article
      data-panel
      aria-labelledby={`practice-${practice.id}`}
      className="relative border-t border-border h-scroll:flex h-scroll:h-svh h-scroll:w-[82vw] h-scroll:shrink-0 h-scroll:items-center h-scroll:border-t-0 h-scroll:border-l xl:h-scroll:w-[68vw]"
    >
      <Container className="relative grid grid-cols-4 gap-x-6 py-16 md:grid-cols-8 md:py-24 lg:grid-cols-12 h-scroll:max-w-none h-scroll:py-0">
        <span
          data-drift
          aria-hidden
          className="text-outline pointer-events-none absolute -top-4 right-4 font-display text-mega leading-none font-extrabold text-border font-stretch-expanded md:right-8 lg:top-auto lg:right-12 lg:-bottom-8"
        >
          {practice.number}
        </span>

        <div className="relative col-span-4 md:col-span-5 lg:col-span-7">
          <p className={cn(type.label, "text-muted")}>
            {practice.number} <span className="text-foreground">/ 04</span>
          </p>
          <h3 id={`practice-${practice.id}`} className={cn(type.display, "mt-4")}>
            {practice.name}
          </h3>
          <p className={cn(type.subheading, "mt-2 text-highlight")}>
            {practice.tagline.replace(/\.$/, "")}
            <ScopeDot />
          </p>
          <p className={cn(type.body, "mt-6 max-w-lg text-muted md:text-lg")}>{practice.summary}</p>

          <ul className="mt-8 max-w-lg border-t border-border">
            {practice.highlights.map((item) => (
              <li key={item} className="border-b border-border py-2 text-sm md:text-base">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className={cn(type.label, "mb-4 text-muted")}>Divisions</p>
            <LetterLinks practice={practice} />
          </div>
        </div>

        <div className="relative col-span-4 mt-12 md:col-span-3 md:mt-0 md:self-center lg:col-span-5">
          <PracticeArt id={practice.id} className="mx-auto w-full max-w-xs md:max-w-none lg:max-w-md" />
        </div>
      </Container>
    </article>
  );
}

export function Practices() {
  return (
    <section id="practices" data-tone="night" aria-labelledby="practices-title" className="relative">
      <PracticesTrack>
        <div data-track className="flex flex-col h-scroll:h-svh h-scroll:w-max h-scroll:flex-row">
          <div
            data-panel
            className="h-scroll:flex h-scroll:h-svh h-scroll:w-[46vw] h-scroll:shrink-0 h-scroll:items-center xl:h-scroll:w-[40vw]"
          >
            <Container className="py-16 md:py-24 h-scroll:py-0">
              <SectionLabel number="03">What we do</SectionLabel>
              <h2 id="practices-title" className={cn(type.display, "mt-4 max-w-xl lg:mt-6")}>
                Four practices. One growth system<ScopeDot />
              </h2>
              <p className={cn(type.lead, "mt-6 max-w-md")}>
                Every engagement draws on the same 26 specialist divisions, coordinated by one
                strategy team.
              </p>
              <p className={cn(type.label, "mt-12 hidden items-center gap-4 text-muted h-scroll:flex")}>
                Keep scrolling
                <span aria-hidden className="h-px w-16 bg-signal" />
              </p>
            </Container>
          </div>

          {core.map((practice) => (
            <PracticePanel key={practice.id} practice={practice} />
          ))}

          <article
            data-panel
            aria-labelledby="practice-strategy"
            className="relative border-t border-border h-scroll:flex h-scroll:h-svh h-scroll:w-[64vw] h-scroll:shrink-0 h-scroll:items-center h-scroll:border-t-0 h-scroll:border-l xl:h-scroll:w-[52vw]"
          >
            <Container className="relative py-16 md:py-24 h-scroll:max-w-none h-scroll:py-0">
              <span
                aria-hidden
                className="text-outline pointer-events-none absolute top-0 right-4 font-display text-mega leading-none font-extrabold text-border font-stretch-expanded md:right-8 lg:top-auto lg:right-12 lg:-bottom-8"
              >
                Z
              </span>
              <p className={cn(type.label, "relative text-muted")}>Division Z · Consulting & Transformation</p>
              <h3 id="practice-strategy" className={cn(type.display, "relative mt-4 max-w-xl")}>
                It all starts with strategy<ScopeDot />
              </h3>
              <p className={cn(type.body, "relative mt-6 max-w-md text-muted md:text-lg")}>
                {strategy.summary}
              </p>
              <div className="relative mt-8">
                <Magnetic>
                  <Button href={contactLinks.strategyCall} size="lg" icon={ArrowUpRight} iconMotion="up-right">
                    Book a strategy call
                  </Button>
                </Magnetic>
              </div>
            </Container>
          </article>
        </div>
      </PracticesTrack>
    </section>
  );
}
