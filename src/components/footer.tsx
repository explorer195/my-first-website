import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p>&copy; {siteConfig.name}. All rights reserved.</p>
        <nav className="flex gap-6" aria-label="Footer">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
