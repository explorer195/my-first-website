import { Container } from "@/components/ui/container";
import { ScopeDot } from "@/components/ui/scope-dot";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { divisions } from "@/content/divisions";
import { cn } from "@/lib/cn";
import { type } from "@/lib/typography";
import { DivisionIndex } from "./division-index";

export function DivisionIndexSection() {
  return (
    <Section id="index" tone="paper" labelledBy="index-title">
      <Container>
        <div className="grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12">
          <SectionLabel number="04" className="col-span-4 md:col-span-8 lg:col-span-12">
            The index
          </SectionLabel>
          <h2
            id="index-title"
            className={cn(type.display, "col-span-4 mt-4 md:col-span-8 lg:col-span-8 lg:mt-6")}
          >
            The A–Z of digital growth<ScopeDot />
          </h2>
          <p
            className={cn(
              type.lead,
              "col-span-4 mt-6 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end",
            )}
          >
            26 specialist divisions. Choose one, or let us assemble the right team for your goals.
          </p>
        </div>
        <DivisionIndex divisions={divisions} />
      </Container>
    </Section>
  );
}
