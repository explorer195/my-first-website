import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";

const points = [
  "Next.js App Router with TypeScript",
  "Tailwind CSS for styling",
  "Motion for smooth animations",
  "Lucide for crisp, consistent icons",
];

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-y border-border bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            A modern stack, ready to grow
          </h2>
          <p className="mt-4 text-muted">
            This website is built on tools used by professional teams around
            the world. It is easy to extend with new pages, sections and
            features as your project grows.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <Check className="size-3.5" aria-hidden />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
