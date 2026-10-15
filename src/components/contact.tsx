import { Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 px-6 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to start?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/85">
            Have a question or an idea? We would love to hear from you.
          </p>
          <a
            href="mailto:hello@example.com"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-slate-900 transition-transform hover:scale-105"
          >
            <Mail className="size-4" aria-hidden />
            Get in touch
          </a>
        </div>
      </Reveal>
    </section>
  );
}
