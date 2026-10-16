import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { primaryMarkets, additionalMarkets } from "@/content/markets";
import { cn } from "@/lib/cn";
import { contactLinks, siteConfig } from "@/lib/site";
import { type } from "@/lib/typography";
import { CopyrightYear } from "./copyright-year";
import { FooterWordmark } from "./footer-wordmark";

const explore = [...siteConfig.nav, { label: "FAQ", href: "/#faq" }];

export function Footer() {
  return (
    <footer data-tone="night" data-site-footer className="relative overflow-hidden pt-16 md:pt-24">
      <Container>
        <div className="grid grid-cols-4 gap-x-6 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <p className={cn(type.subheading, "max-w-md")}>
              A global digital growth, AI and technology company.
            </p>
            <a
              href={contactLinks.email}
              className="link-underline mt-6 inline-block text-lg text-highlight md:text-xl"
            >
              {siteConfig.email}
            </a>
          </div>

          <nav aria-label="Footer" className="col-span-2 md:col-span-3 lg:col-span-2 lg:col-start-7">
            <p className={cn(type.label, "text-muted")}>Explore</p>
            <ul className="mt-4 flex flex-col">
              {explore.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-underline inline-flex min-h-10 items-center text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <p className={cn(type.label, "text-muted")}>Get started</p>
            <ul className="mt-4 flex flex-col">
              <li>
                <a href={contactLinks.strategyCall} className="link-underline inline-flex min-h-10 items-center text-sm">
                  Strategy call
                </a>
              </li>
              <li>
                <a href={contactLinks.visibilityAudit} className="link-underline inline-flex min-h-10 items-center text-sm">
                  AI visibility audit
                </a>
              </li>
              <li>
                <a href={contactLinks.email} className="link-underline inline-flex min-h-10 items-center text-sm">
                  Email us
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-4 md:col-span-3 lg:col-span-2">
            <p className={cn(type.label, "text-muted")}>Markets</p>
            <p className="mt-4 text-sm leading-relaxed">
              {primaryMarkets.map((m) => m.label).join(" · ")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              and {additionalMarkets.length} additional markets across Europe, the Gulf and Asia-Pacific.
            </p>
          </div>
        </div>
      </Container>

      <FooterWordmark />

      <Container>
        <div className="flex flex-col gap-4 border-t border-border py-8 text-sm text-muted lg:flex-row lg:items-center lg:justify-between">
          <p>
            © <CopyrightYear /> {siteConfig.name}™
          </p>
          <p className={cn(type.label, "flex flex-wrap items-center gap-2")}>
            Grow brands <span aria-hidden className="size-1 rounded-full bg-signal" /> Generate leads{" "}
            <span aria-hidden className="size-1 rounded-full bg-signal" /> Scale globally
          </p>
          <a href="#top" className="group inline-flex min-h-12 items-center gap-2 self-start text-foreground lg:self-auto">
            <span className="link-underline">Back to top</span>
            <ArrowUp aria-hidden className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
