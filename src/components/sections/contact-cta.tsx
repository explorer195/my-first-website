import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { ScopeReveal } from "@/components/motion/scope-reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScopeDot } from "@/components/ui/scope-dot";
import { contactLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";
import { type } from "@/lib/typography";

export function ContactCta() {
  return (
    // The surrounding tone matches the section above, so the reveal reads as
    // one scene opening into the next.
    <section id="contact" data-tone="paper" aria-labelledby="contact-title" className="bg-surface">
      <ScopeReveal>
        <div data-scope-panel data-tone="night" className="relative flex min-h-svh items-center py-24 md:py-32">
          <Container>
            <div data-scope-content className="grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12">
              <p className={cn(type.label, "col-span-4 text-muted md:col-span-8 lg:col-span-12")}>
                Start here
              </p>
              <h2
                id="contact-title"
                className={cn(type.mega, "col-span-4 mt-6 md:col-span-8 lg:col-span-12 lg:mt-8")}
              >
                Let’s scope
                <br />
                your growth<ScopeDot />
              </h2>
              <p className={cn(type.lead, "col-span-4 mt-8 md:col-span-6 lg:col-span-5 lg:mt-12")}>
                Tell us where you want to grow. We’ll come back with a clear, evidence-based plan
                across search, AI and technology.
              </p>
              <div className="col-span-4 mt-8 flex flex-col gap-4 md:col-span-8 md:flex-row md:items-center lg:col-span-6 lg:col-start-7 lg:mt-12 lg:justify-end lg:self-end">
                <Magnetic className="w-full md:w-auto">
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
                <Button
                  href={contactLinks.visibilityAudit}
                  variant="ghost"
                  size="lg"
                  icon={ArrowUpRight}
                  iconMotion="up-right"
                  className="w-full md:w-auto"
                >
                  Request an AI visibility audit
                </Button>
              </div>
              <p className={cn(type.small, "col-span-4 mt-12 md:col-span-8 lg:col-span-12 lg:mt-16")}>
                Or email{" "}
                <a href={contactLinks.email} className="link-underline text-foreground">
                  {siteConfig.email}
                </a>
              </p>
            </div>
          </Container>
        </div>
      </ScopeReveal>
    </section>
  );
}
