// Central place for site-wide details. Edit these values to update the
// name, contact details and navigation everywhere on the site.
export const siteConfig = {
  name: "DigitalScope Marketing",
  shortName: "DigitalScope",
  url: "https://digitalscopemarketing.com",
  tagline: "Grow brands. Generate leads. Scale globally.",
  description:
    "DigitalScope Marketing is a global digital growth, AI and technology company: SEO, AEO, GEO and AI search optimization, performance marketing, AI agents, automation and custom software.",
  // TODO: replace with the real inbox before launch.
  email: "hello@digitalscopemarketing.com",
  // Same order as the sections on the homepage.
  nav: [
    { label: "AI Search", href: "/#ai-search" },
    { label: "Services", href: "/#practices" },
    { label: "A–Z Index", href: "/#index" },
    { label: "Markets", href: "/#markets" },
    { label: "Approach", href: "/#approach" },
  ],
} as const;

export const contactLinks = {
  strategyCall: `mailto:${siteConfig.email}?subject=${encodeURIComponent("Strategy call request")}`,
  visibilityAudit: `mailto:${siteConfig.email}?subject=${encodeURIComponent("AI visibility audit request")}`,
  email: `mailto:${siteConfig.email}`,
} as const;
