import { Palette, ShieldCheck, Smartphone, Zap } from "lucide-react";
import { Reveal } from "@/components/reveal";

const features = [
  {
    icon: Zap,
    title: "Lightning fast",
    description:
      "Pages are pre-rendered and optimized by Next.js for instant loading.",
  },
  {
    icon: Smartphone,
    title: "Mobile first",
    description:
      "Designed for small screens first, then scaled up beautifully to desktop.",
  },
  {
    icon: Palette,
    title: "Easy to style",
    description:
      "Tailwind CSS makes it simple to tweak colors, spacing and layout.",
  },
  {
    icon: ShieldCheck,
    title: "Production ready",
    description:
      "Type-safe with TypeScript and ready to deploy to Vercel in one click.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to get started
          </h2>
          <p className="mt-4 text-muted">
            A solid foundation so you can focus on your content and ideas.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="inline-flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <feature.icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-5 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
