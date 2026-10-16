import { cn } from "@/lib/cn";
import { type } from "@/lib/typography";

type SectionLabelProps = {
  number?: string;
  children: React.ReactNode;
  className?: string;
};

/** Mono eyebrow such as "02 — Search, rebuilt for AI". */
export function SectionLabel({ number, children, className }: SectionLabelProps) {
  return (
    <p className={cn(type.label, "flex items-center gap-4 text-muted", className)}>
      {number && <span className="text-foreground">{number}</span>}
      {number && <span aria-hidden className="h-px w-8 bg-current opacity-40" />}
      <span>{children}</span>
    </p>
  );
}
