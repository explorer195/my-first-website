"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/cn";
import { contactLinks, siteConfig } from "@/lib/site";
import { MenuToggle, MobileMenu } from "./mobile-menu";
import { useActiveSection } from "./use-active-section";

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(siteConfig.nav.map((item) => item.href.split("#")[1]));

  // Hide on the way down, return on the way up.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > previous && latest > 480);
  });

  // While the menu is open: Escape closes it, the page behind can't scroll
  // or take focus.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const background = document.querySelectorAll<HTMLElement>("#main, [data-site-footer]");
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    background.forEach((el) => el.setAttribute("inert", ""));
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previousOverflow;
      background.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        data-tone="night"
        className="fixed inset-x-0 top-0 z-50 bg-transparent"
        initial={false}
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease }}
      >
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 border-b border-border bg-background/75 backdrop-blur-xl transition-opacity duration-500",
            scrolled && !open ? "opacity-100" : "opacity-0",
          )}
        />
        <Container className="relative flex h-16 items-center justify-between gap-8 lg:h-20">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {siteConfig.nav.map((item) => {
                const isActive = active === item.href.split("#")[1];
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "link-underline relative py-2 text-sm transition-colors duration-300 hover:text-foreground",
                        isActive ? "text-foreground" : "text-muted",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button href={contactLinks.strategyCall} icon={ArrowUpRight} iconMotion="up-right">
                Book a strategy call
              </Button>
            </div>
            <MenuToggle open={open} onToggle={() => setOpen((value) => !value)} />
          </div>
        </Container>
      </motion.header>

      <MobileMenu open={open} onNavigate={() => setOpen(false)} />
    </>
  );
}
