import Image from "next/image";
import Link from "next/link";
import emblem from "@/assets/brand/emblem.webp";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

/**
 * Horizontal lockup: the DigitalScope emblem with a live-text wordmark, so
 * the "Digital" half stays legible on both light and dark sections.
 * The gold orb keeps a hidden "o", so the link reads "DigitalScope Marketing".
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex min-h-12 items-center gap-2", className)}>
      <Image src={emblem} alt="" className="h-10 w-auto" sizes="56px" />
      <span className="flex flex-col">
        <span className="font-display text-lg leading-none font-extrabold tracking-tight font-stretch-expanded">
          Digital
          <span className="text-highlight">
            Sc
            <span className="scope-o">
              <span className="sr-only">o</span>
            </span>
            pe
          </span>
        </span>
        <span className="sr-only">&nbsp;</span>
        <span className="mt-1 font-sans text-xs leading-none font-medium tracking-brand text-muted uppercase">
          Marketing
        </span>
      </span>
    </Link>
  );
}
