"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { contactLinks, siteConfig } from "@/lib/site";
import { type } from "@/lib/typography";

const ease = [0.16, 1, 0.3, 1] as const;
const curtain = [0.76, 0, 0.24, 1] as const;

type MenuToggleProps = {
  open: boolean;
  onToggle: () => void;
};

/** Two lines that fold into a cross. */
export function MenuToggle({ open, onToggle }: MenuToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative -mr-2 flex size-12 items-center justify-center lg:hidden"
    >
      <span aria-hidden className="relative block h-2 w-6">
        <span
          className={cn(
            "absolute left-0 block h-0.5 w-6 bg-foreground transition-transform duration-500 ease-out-expo",
            open ? "top-1 rotate-45" : "top-0",
          )}
        />
        <span
          className={cn(
            "absolute left-0 block h-0.5 w-6 bg-foreground transition-transform duration-500 ease-out-expo",
            open ? "top-1 -rotate-45" : "top-2",
          )}
        />
      </span>
    </button>
  );
}

type MobileMenuProps = {
  open: boolean;
  onNavigate: () => void;
};

export function MobileMenu({ open, onNavigate }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          key="mobile-menu"
          data-tone="night"
          className="fixed inset-0 z-40 overflow-y-auto lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.8, ease: curtain }}
        >
          <Container className="flex min-h-full flex-col pt-24 pb-8 md:pt-32">
            <nav aria-label="Mobile">
              <ul className="border-t border-border">
                {siteConfig.nav.map((item, index) => (
                  <li key={item.href} className="overflow-hidden border-b border-border">
                    <motion.a
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        type.heading,
                        "flex items-baseline gap-4 py-4 md:py-6",
                      )}
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ delay: 0.25 + index * 0.06, duration: 0.8, ease }}
                    >
                      <span className={cn(type.label, "text-muted")}>0{index + 1}</span>
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="mt-auto flex flex-col gap-6 pt-12 md:flex-row md:items-end md:justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex flex-col gap-2">
                <p className={cn(type.label, "text-muted")}>Start a conversation</p>
                <a href={contactLinks.email} className="link-underline self-start text-lg">
                  {siteConfig.email}
                </a>
              </div>
              <Button
                href={contactLinks.strategyCall}
                size="lg"
                icon={ArrowUpRight}
                iconMotion="up-right"
                className="w-full md:w-auto"
              >
                Book a strategy call
              </Button>
            </motion.div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
