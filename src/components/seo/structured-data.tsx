import { divisions } from "@/content/divisions";
import { faq } from "@/content/faq";
import { markets } from "@/content/markets";
import { siteConfig } from "@/lib/site";

/**
 * Organization, website, services and FAQ described for search engines and
 * AI systems (JSON-LD). The email address is left out until it is confirmed.
 */
export function StructuredData() {
  const id = (fragment: string) => `${siteConfig.url}/#${fragment}`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": id("organization"),
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/brand/digitalscope-logo.webp`,
        slogan: siteConfig.tagline,
        description: siteConfig.description,
        areaServed: markets.map((m) => ({ "@type": "Country", name: m.name })),
        knowsAbout: [
          "Search engine optimization",
          "Answer engine optimization",
          "Generative engine optimization",
          "AI search optimization",
          "Performance marketing",
          "Conversion rate optimization",
          "AI chatbots",
          "AI agents",
          "AI automation",
          "Web development",
          "Mobile app development",
          "SaaS development",
          "Cloud and DevOps",
          "Digital transformation",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services, A to Z",
          itemListElement: divisions.map((d) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: d.fullName ?? d.name,
              description: d.summary,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": id("website"),
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "en",
        publisher: { "@id": id("organization") },
      },
      {
        "@type": "FAQPage",
        "@id": id("faq"),
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
