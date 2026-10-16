import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ScopeDot } from "@/components/ui/scope-dot";
import { Section } from "@/components/ui/section";
import { SectionLabel } from "@/components/ui/section-label";
import { faq } from "@/content/faq";
import { cn } from "@/lib/cn";
import { type } from "@/lib/typography";

/**
 * Native <details> elements: accessible, usable without JavaScript, and
 * every answer stays in the HTML for search and answer engines.
 */
export function FaqSection() {
  return (
    <Section id="faq" tone="paper" labelledBy="faq-title" className="bg-surface">
      <Container>
        <div className="grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionLabel number="07">Answers</SectionLabel>
              <h2 id="faq-title" className={cn(type.display, "mt-4 lg:mt-6")}>
                Questions, answered directly<ScopeDot />
              </h2>
              <p className={cn(type.small, "mt-6 max-w-xs")}>
                Written the way we write answers for clients: direct, specific and marked up for
                answer engines.
              </p>
            </div>
          </div>

          <div className="col-span-4 mt-12 border-t border-foreground md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
            {faq.map((item, index) => (
              <details
                key={item.question}
                name="faq"
                open={index === 0}
                className="details-animated group border-b border-border"
              >
                <summary className="flex min-h-16 cursor-pointer items-start gap-6 py-6 md:py-8">
                  <span className="mt-1 w-6 shrink-0 font-mono text-xs text-muted">
                    0{index + 1}
                  </span>
                  <h3 className={cn(type.subheading, "flex-1")}>{item.question}</h3>
                  <Plus
                    aria-hidden
                    className="mt-1 size-5 shrink-0 text-muted transition-transform duration-500 ease-out-expo group-open:rotate-45"
                  />
                </summary>
                <p className={cn(type.body, "max-w-2xl pb-8 pl-12 text-muted md:text-lg")}>
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
