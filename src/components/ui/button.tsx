import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { SmartLink } from "./smart-link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  /** Direction the icon nudges on hover. */
  iconMotion?: "right" | "up-right" | "down";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/85",
  ghost:
    "border border-border text-foreground hover:border-foreground/50 hover:bg-foreground/5",
};

const sizes: Record<Size, string> = {
  md: "h-12 gap-4 px-6 text-sm",
  lg: "h-14 gap-6 px-8 text-base",
};

const iconMotions = {
  right: "group-hover:translate-x-1",
  "up-right": "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  down: "group-hover:translate-y-0.5",
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = "primary",
    size = "md",
    icon: Icon,
    iconMotion = "right",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "group relative inline-flex items-center justify-center font-medium whitespace-nowrap select-none",
    "transition-[background-color,border-color,color] duration-300 active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  // The label rolls up on hover; the duplicate is hidden from assistive tech.
  const content = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full motion-reduce:transition-none">
          {children}
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0 motion-reduce:transition-none"
        >
          {children}
        </span>
      </span>
      {Icon && (
        <Icon
          aria-hidden
          className={cn(
            "size-4 shrink-0 transition-transform duration-500 ease-out-expo motion-reduce:transition-none",
            iconMotions[iconMotion],
          )}
        />
      )}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    return (
      <SmartLink href={href} className={classes} {...anchorProps}>
        {content}
      </SmartLink>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
