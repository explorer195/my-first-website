import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  tone?: "paper" | "night";
  labelledBy?: string;
  /** Default vertical padding; turn off for full-bleed or pinned layouts. */
  spacing?: "default" | "none";
  className?: string;
  children: React.ReactNode;
};

/** A page section with a colour tone and the standard vertical rhythm. */
export function Section({
  id,
  tone = "paper",
  labelledBy,
  spacing = "default",
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={cn(
        "relative",
        spacing === "default" && "py-16 md:py-24 lg:py-32",
        className,
      )}
    >
      {children}
    </section>
  );
}
