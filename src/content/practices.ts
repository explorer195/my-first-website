export type PracticeId =
  | "visibility"
  | "growth"
  | "intelligence"
  | "engineering"
  | "strategy";

export type Practice = {
  id: PracticeId;
  number: string;
  name: string;
  tagline: string;
  summary: string;
  highlights: string[];
};

// The five practices group the 26 divisions into a story a buyer can follow.
export const practices: Practice[] = [
  {
    id: "visibility",
    number: "01",
    name: "Visibility",
    tagline: "Be found.",
    summary:
      "SEO, AEO, GEO and AI search optimization, supported by content, digital PR and local growth, so customers find you wherever they search, ask or compare.",
    highlights: [
      "Technical, enterprise and international SEO",
      "Answer and generative engine optimization",
      "AI search visibility and citation monitoring",
      "Content, digital PR and authority",
      "Local and multi-location growth",
    ],
  },
  {
    id: "growth",
    number: "02",
    name: "Growth",
    tagline: "Be chosen.",
    summary:
      "Performance marketing, conversion optimization, funnels, email, social and analytics, managed around pipeline and revenue rather than vanity metrics.",
    highlights: [
      "Google, Meta, LinkedIn and TikTok advertising",
      "Conversion rate optimization and testing",
      "Lead-generation and sales funnels",
      "Email, CRM and social campaigns",
      "Tracking, attribution and dashboards",
    ],
  },
  {
    id: "intelligence",
    number: "03",
    name: "Intelligence",
    tagline: "Be always on.",
    summary:
      "AI chatbots, AI agents and automation embedded in real business workflows, plus the CRM and revenue operations they run on.",
    highlights: [
      "AI sales, support and receptionist agents",
      "Website and WhatsApp AI chatbots",
      "Business-process and CRM automation",
      "Lead routing, scoring and enrichment",
      "Revenue operations and reporting",
    ],
  },
  {
    id: "engineering",
    number: "04",
    name: "Engineering",
    tagline: "Be ready to scale.",
    summary:
      "AI-assisted rapid development, websites, mobile apps, SaaS, integrations, cloud and security, built to grow with your business.",
    highlights: [
      "Rapid MVPs and AI prototypes",
      "Websites, portals and web applications",
      "iOS, Android and cross-platform apps",
      "SaaS, CRM and custom software",
      "APIs, cloud, DevOps and security",
    ],
  },
  {
    id: "strategy",
    number: "05",
    name: "Strategy",
    tagline: "Start with clarity.",
    summary:
      "Digital and AI transformation, AI readiness, technology and growth strategy: the consulting layer that connects every division.",
    highlights: [
      "Digital and AI transformation",
      "AI readiness and automation strategy",
      "AI search, AEO and GEO strategy",
      "MarTech and CRM transformation",
      "Growth strategy",
    ],
  },
];

export const practiceById = Object.fromEntries(
  practices.map((p) => [p.id, p]),
) as Record<PracticeId, Practice>;
