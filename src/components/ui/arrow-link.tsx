import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { SmartLink } from "./smart-link";

type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
};

/** Text link with an animated underline and a nudging arrow. */
export function ArrowLink({ href, children, icon: Icon = ArrowRight, className }: ArrowLinkProps) {
  return (
    <SmartLink
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center gap-2 text-sm font-medium",
        className,
      )}
    >
      <span className="link-underline pb-0.5">{children}</span>
      <Icon
        aria-hidden
        className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </SmartLink>
  );
}
