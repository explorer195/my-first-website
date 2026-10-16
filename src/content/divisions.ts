import type { PracticeId } from "./practices";

export type ServiceGroup = {
  title?: string;
  items: string[];
};

export type Division = {
  letter: string;
  name: string;
  /** Long form of an abbreviated name, e.g. "Answer Engine Optimization". */
  fullName?: string;
  practice: PracticeId;
  summary: string;
  groups: ServiceGroup[];
};

// The 26 DigitalScope divisions, A to Z. Service lists follow the
// company's service architecture and will power the internal pages.
export const divisions: Division[] = [
  {
    letter: "A",
    name: "SEO",
    fullName: "Search Engine Optimization",
    practice: "visibility",
    summary:
      "Technical, content and authority SEO for every kind of site, from local businesses to international enterprise platforms.",
    groups: [
      {
        items: [
          "Technical SEO",
          "On-Page SEO",
          "Off-Page SEO",
          "International SEO",
          "Local SEO",
          "Enterprise SEO",
          "E-commerce SEO",
          "SaaS SEO",
          "B2B SEO",
          "B2C SEO",
          "Franchise SEO",
          "Multi-location SEO",
          "Programmatic SEO",
          "Semantic SEO",
          "Entity SEO",
          "Topical Authority",
          "Content-led SEO",
          "Image SEO",
          "Video SEO",
          "News SEO",
          "WordPress SEO",
          "JavaScript SEO",
          "Mobile SEO",
          "Website migration SEO",
          "International website architecture",
          "SEO audits",
          "Competitor SEO analysis",
          "Keyword research",
          "Search-intent analysis",
          "Internal-link optimization",
          "Link-building strategy",
          "Digital PR",
          "Authority building",
          "SEO reporting",
          "SEO consulting",
        ],
      },
    ],
  },
  {
    letter: "B",
    name: "AEO",
    fullName: "Answer Engine Optimization",
    practice: "visibility",
    summary:
      "A dedicated discipline for becoming the direct answer: featured snippets, People Also Ask, voice and conversational search.",
    groups: [
      {
        items: [
          "Answer Engine Optimization",
          "Featured Snippet Optimization",
          "People Also Ask optimization",
          "Question-based content strategy",
          "Direct-answer optimization",
          "Conversational search optimization",
          "FAQ optimization",
          "Voice-search optimization",
          "Question-intent research",
          "Answer-focused content",
          "Structured answer architecture",
          "FAQ schema",
          "HowTo schema where appropriate",
          "Knowledge extraction",
          "Search-answer formatting",
          "Answer visibility monitoring",
          "AEO audits",
          "AEO content optimization",
          "AEO reporting",
        ],
      },
    ],
  },
  {
    letter: "C",
    name: "GEO",
    fullName: "Generative Engine Optimization",
    practice: "visibility",
    summary:
      "Improving how generative AI experiences represent, reference and cite your brand, measured with evidence rather than promises.",
    groups: [
      {
        items: [
          "Generative Engine Optimization",
          "AI search visibility",
          "Generative search optimization",
          "AI citation strategy",
          "Brand/entity optimization",
          "Entity authority",
          "Knowledge-source optimization",
          "Brand mention analysis",
          "AI answer analysis",
          "AI recommendation analysis",
          "AI competitor analysis",
          "Generative search content strategy",
          "AI visibility audits",
          "AI citation monitoring",
          "AI brand presence monitoring",
          "AI search reporting",
        ],
      },
    ],
  },
  {
    letter: "D",
    name: "AI Search Optimization",
    practice: "visibility",
    summary:
      "Visibility across the wider AI discovery ecosystem, including Google's AI experiences, ChatGPT, Perplexity, Gemini, Copilot and Claude.",
    groups: [
      {
        title: "Platforms and channels",
        items: [
          "Google AI search experiences",
          "Google AI Overviews where available",
          "ChatGPT",
          "Perplexity",
          "Gemini",
          "Microsoft Copilot",
          "Claude and other relevant AI discovery systems",
        ],
      },
      {
        title: "Services",
        items: [
          "AI search visibility audit",
          "AI brand visibility audit",
          "AI recommendation monitoring",
          "AI citation monitoring",
          "AI competitor visibility",
          "AI search content strategy",
          "AI entity optimization",
          "AI knowledge-source analysis",
          "AI search reporting",
          "AI discovery strategy",
        ],
      },
    ],
  },
  {
    letter: "E",
    name: "AI-Assisted SEO",
    practice: "visibility",
    summary:
      "AI as the execution layer that makes SEO, AEO and GEO faster and more precise, never a replacement for them.",
    groups: [
      {
        items: [
          "AI keyword research",
          "AI search-intent clustering",
          "AI content briefs",
          "AI SERP analysis",
          "AI competitor research",
          "AI topical-map generation",
          "AI entity analysis",
          "AI internal-link suggestions",
          "AI content optimization",
          "AI technical SEO assistance",
          "AI SEO reporting",
          "AI SEO workflow automation",
          "AI-assisted content QA",
          "AI-assisted SEO audits",
        ],
      },
    ],
  },
  {
    letter: "F",
    name: "Content Marketing",
    practice: "visibility",
    summary:
      "Commercial, editorial and technical content that builds topical authority and turns readers into leads.",
    groups: [
      {
        items: [
          "SEO content",
          "Commercial content",
          "Product reviews",
          "Comparison content",
          "Service pages",
          "Landing pages",
          "Location pages",
          "Industry pages",
          "Case studies",
          "Whitepapers",
          "E-books",
          "Lead magnets",
          "Thought leadership",
          "B2B content",
          "SaaS content",
          "AI content",
          "Technical content",
          "Editorial strategy",
          "Content calendars",
          "Content clusters",
          "Topical authority campaigns",
        ],
      },
    ],
  },
  {
    letter: "G",
    name: "Digital PR & Authority",
    practice: "visibility",
    summary:
      "Earned mentions, expert contributions and data-driven campaigns that build authority with people, publishers and algorithms.",
    groups: [
      {
        items: [
          "Digital PR",
          "Brand mentions",
          "Publisher outreach",
          "Expert contributions",
          "Thought leadership",
          "Industry publications",
          "Data-driven PR",
          "Digital partnerships",
          "Brand authority campaigns",
          "Reputation management",
          "Link acquisition",
          "Citation building",
        ],
      },
    ],
  },
  {
    letter: "H",
    name: "Local & Multi-Location Growth",
    practice: "visibility",
    summary:
      "Map visibility, local pages and review strategy for single locations, multi-location brands and franchises.",
    groups: [
      {
        items: [
          "Local SEO",
          "Google Business Profile optimization",
          "Local landing pages",
          "Local citations",
          "Local link building",
          "Review strategy",
          "Reputation management",
          "Multi-location SEO",
          "Franchise SEO",
          "Local lead generation",
          "Local service pages",
          "Map visibility strategy",
        ],
      },
    ],
  },
  {
    letter: "I",
    name: "Performance Marketing",
    practice: "growth",
    summary:
      "Paid media across Google, Meta, LinkedIn, TikTok, Microsoft and other platforms, run for pipeline and profitable scale.",
    groups: [
      {
        title: "Google",
        items: [
          "Search Ads",
          "Performance Max",
          "Display",
          "Shopping",
          "YouTube advertising",
          "Remarketing",
        ],
      },
      {
        title: "Meta",
        items: [
          "Facebook Ads",
          "Instagram Ads",
          "Lead-generation campaigns",
          "E-commerce campaigns",
          "Retargeting",
        ],
      },
      {
        title: "Other platforms",
        items: [
          "LinkedIn Ads",
          "TikTok Ads",
          "Microsoft Ads",
          "Other relevant platforms by market",
        ],
      },
      {
        title: "Services",
        items: [
          "Campaign strategy",
          "Account setup",
          "Tracking",
          "Conversion optimization",
          "Creative testing",
          "Audience development",
          "Retargeting",
          "Funnel optimization",
          "Reporting",
          "Performance scaling",
        ],
      },
    ],
  },
  {
    letter: "J",
    name: "CRO",
    fullName: "Conversion Rate Optimization",
    practice: "growth",
    summary:
      "Research-led experimentation that turns more of your existing traffic into leads, sales and revenue.",
    groups: [
      {
        items: [
          "Website conversion audits",
          "Landing-page optimization",
          "Lead-form optimization",
          "CTA optimization",
          "Checkout optimization",
          "Funnel optimization",
          "Heatmap analysis",
          "User behavior analysis",
          "A/B testing",
          "Experimentation",
          "Conversion copywriting",
          "Trust optimization",
          "Offer optimization",
          "Mobile conversion optimization",
        ],
      },
    ],
  },
  {
    letter: "K",
    name: "Funnels & Lead Generation",
    practice: "growth",
    summary:
      "Lead, sales, booking and webinar funnels with automated follow-up built in.",
    groups: [
      {
        items: [
          "Lead-generation funnels",
          "Sales funnels",
          "Webinar funnels",
          "Consultation funnels",
          "B2B funnels",
          "SaaS funnels",
          "E-commerce funnels",
          "Lead magnets",
          "Quiz funnels",
          "Booking funnels",
          "Appointment funnels",
          "Automated follow-up funnels",
        ],
      },
    ],
  },
  {
    letter: "L",
    name: "AI Chatbots",
    practice: "intelligence",
    summary:
      "Website, WhatsApp and messenger assistants that answer questions, qualify leads and book appointments around the clock.",
    groups: [
      {
        items: [
          "Website AI chatbots",
          "Customer-support bots",
          "Sales bots",
          "Lead-qualification bots",
          "FAQ bots",
          "Knowledge-base bots",
          "WhatsApp AI bots",
          "Messenger bots",
          "Internal company bots",
          "Appointment bots",
          "AI receptionists",
          "AI sales assistants",
          "AI customer-service assistants",
        ],
      },
    ],
  },
  {
    letter: "M",
    name: "AI Agents",
    practice: "intelligence",
    summary:
      "Agents embedded in real business workflows, from sales and support to research and operations, with governance, security and measurable outcomes.",
    groups: [
      {
        items: [
          "AI sales agents",
          "AI support agents",
          "AI research agents",
          "AI appointment agents",
          "AI lead-qualification agents",
          "AI follow-up agents",
          "AI receptionist agents",
          "AI operations agents",
          "AI data-processing agents",
          "AI document agents",
          "AI reporting agents",
          "AI marketing agents",
          "AI internal knowledge agents",
          "Multi-step workflow agents",
          "Agentic business workflows",
        ],
      },
    ],
  },
  {
    letter: "N",
    name: "AI Automation",
    practice: "intelligence",
    summary:
      "Business-process automation across CRM, sales, marketing, support, documents and internal operations.",
    groups: [
      {
        items: [
          "Business-process automation",
          "CRM automation",
          "Sales automation",
          "Marketing automation",
          "Customer-support automation",
          "Email automation",
          "WhatsApp automation",
          "Appointment automation",
          "Lead routing",
          "Lead enrichment",
          "Proposal automation",
          "Reporting automation",
          "Document automation",
          "Invoice/workflow automation",
          "Data-entry automation",
          "Customer onboarding automation",
          "Internal workflow automation",
          "AI-powered workflow orchestration",
        ],
      },
    ],
  },
  {
    letter: "O",
    name: "Vibe Coding & Rapid Development",
    practice: "engineering",
    summary:
      "AI-assisted rapid development for MVPs, prototypes, internal tools, dashboards and AI applications.",
    groups: [
      {
        items: [
          "Vibe coding",
          "AI-assisted coding",
          "Rapid MVP development",
          "Startup MVPs",
          "Proof-of-concept development",
          "AI prototypes",
          "AI web applications",
          "AI dashboards",
          "Internal tools",
          "Business applications",
          "SaaS prototypes",
          "Automation applications",
          "Custom tools",
          "API-based applications",
        ],
      },
    ],
  },
  {
    letter: "P",
    name: "Web Development",
    practice: "engineering",
    summary:
      "Corporate, commerce, SaaS and booking websites, portals and dashboards, built for speed, search and conversion.",
    groups: [
      {
        items: [
          "Corporate websites",
          "Business websites",
          "Lead-generation websites",
          "E-commerce websites",
          "SaaS websites",
          "Membership websites",
          "Directory websites",
          "Marketplace websites",
          "Booking websites",
          "Education websites",
          "Real-estate websites",
          "Healthcare websites",
          "Professional-service websites",
          "Custom web applications",
          "Customer portals",
          "Admin dashboards",
          "CRM interfaces",
          "API integrations",
          "Payment integrations",
          "Database systems",
        ],
      },
    ],
  },
  {
    letter: "Q",
    name: "Mobile App Development",
    practice: "engineering",
    summary:
      "iOS, Android and cross-platform apps for customers, teams and AI-powered products.",
    groups: [
      {
        items: [
          "Android apps",
          "iOS apps",
          "Cross-platform apps",
          "Business apps",
          "E-commerce apps",
          "Booking apps",
          "Membership apps",
          "Education apps",
          "Customer apps",
          "Internal company apps",
          "AI-powered apps",
          "SaaS mobile apps",
          "MVP applications",
        ],
      },
    ],
  },
  {
    letter: "R",
    name: "SaaS & Custom Software",
    practice: "engineering",
    summary:
      "From SaaS MVPs to CRM, ERP and vertical platforms built around the way your business works.",
    groups: [
      {
        items: [
          "SaaS MVP development",
          "Custom SaaS",
          "CRM",
          "ERP",
          "HR systems",
          "Inventory systems",
          "Booking systems",
          "Project-management systems",
          "Customer-support platforms",
          "Marketing platforms",
          "Analytics dashboards",
          "AI SaaS",
          "Vertical SaaS",
          "Internal business software",
        ],
      },
    ],
  },
  {
    letter: "S",
    name: "API & System Integrations",
    practice: "engineering",
    summary:
      "Connecting payments, CRM, marketing, AI, messaging and data systems so information flows without manual work.",
    groups: [
      {
        items: [
          "REST APIs",
          "GraphQL where relevant",
          "Payment APIs",
          "CRM integrations",
          "Marketing integrations",
          "AI API integrations",
          "WhatsApp integrations",
          "Email integrations",
          "Calendar integrations",
          "E-commerce integrations",
          "Database integrations",
          "Third-party software integrations",
          "Webhooks",
          "Automation integrations",
        ],
      },
    ],
  },
  {
    letter: "T",
    name: "CRM & RevOps",
    fullName: "CRM & Revenue Operations",
    practice: "intelligence",
    summary:
      "CRM implementation and revenue operations that align marketing, sales and customer success around one pipeline.",
    groups: [
      {
        title: "CRM",
        items: [
          "CRM implementation",
          "CRM migration",
          "CRM customization",
          "Lead management",
          "Sales pipeline",
          "Customer lifecycle",
          "Customer segmentation",
          "CRM automation",
        ],
      },
      {
        title: "Revenue Operations",
        items: [
          "Sales process optimization",
          "Lead routing",
          "Lead scoring",
          "Pipeline management",
          "Revenue reporting",
          "Sales automation",
          "Marketing-sales alignment",
          "Customer lifecycle automation",
        ],
      },
    ],
  },
  {
    letter: "U",
    name: "Cloud & DevOps",
    practice: "engineering",
    summary:
      "Cloud architecture, migration, CI/CD and monitoring on AWS, Azure and Google Cloud, including AI infrastructure.",
    groups: [
      {
        items: [
          "Cloud consulting",
          "Cloud deployment",
          "Cloud migration",
          "AWS",
          "Azure",
          "Google Cloud",
          "Server deployment",
          "Infrastructure management",
          "CI/CD",
          "DevOps",
          "Database deployment",
          "Monitoring",
          "Backup",
          "Disaster recovery",
          "Scalability",
          "Performance optimization",
          "Cloud security",
          "AI infrastructure",
        ],
      },
    ],
  },
  {
    letter: "V",
    name: "Cybersecurity & Privacy",
    practice: "engineering",
    summary:
      "Security audits, hardening, monitoring and privacy implementation, delivered by qualified specialists and partners.",
    groups: [
      {
        items: [
          "Website security",
          "WordPress security",
          "Security audits",
          "Vulnerability assessments",
          "Security hardening",
          "Business cybersecurity consulting",
          "Identity/security solutions",
          "Password-management implementation",
          "Data-security consulting",
          "Backup & disaster recovery",
          "Privacy implementation",
          "Security monitoring",
          "Security awareness",
          "Cybersecurity technology implementation",
        ],
      },
    ],
  },
  {
    letter: "W",
    name: "Email & CRM Marketing",
    practice: "growth",
    summary:
      "Lifecycle email and CRM campaigns that nurture, onboard and re-engage customers automatically.",
    groups: [
      {
        items: [
          "Email marketing",
          "Newsletter management",
          "Automated sequences",
          "Lead nurturing",
          "Customer onboarding",
          "Abandoned-cart campaigns",
          "Re-engagement",
          "Segmentation",
          "Personalization",
          "Marketing automation",
          "CRM campaigns",
        ],
      },
    ],
  },
  {
    letter: "X",
    name: "Social Media & Creative",
    practice: "growth",
    summary:
      "Social strategy, short-form video, creative production and executive branding that earn attention and trust.",
    groups: [
      {
        items: [
          "Social media strategy",
          "Social media management",
          "Content calendars",
          "Creative design",
          "Short-form video",
          "AI-generated creative",
          "UGC strategy",
          "Influencer campaigns",
          "LinkedIn personal branding",
          "Executive branding",
          "Brand content",
          "Paid-social creative",
        ],
      },
    ],
  },
  {
    letter: "Y",
    name: "Analytics & Data",
    practice: "growth",
    summary:
      "Tracking, attribution and dashboards that show which activity actually drives revenue.",
    groups: [
      {
        items: [
          "GA4",
          "Search Console",
          "Tag management",
          "Conversion tracking",
          "Attribution",
          "Dashboard development",
          "Marketing analytics",
          "SEO analytics",
          "E-commerce analytics",
          "Funnel analytics",
          "Customer analytics",
          "AI reporting",
          "Business intelligence",
          "KPI systems",
        ],
      },
    ],
  },
  {
    letter: "Z",
    name: "Consulting & Transformation",
    practice: "strategy",
    summary:
      "Advisory for digital, AI and marketing transformation: the strategy layer that connects every division.",
    groups: [
      {
        items: [
          "Digital transformation",
          "AI transformation",
          "AI readiness",
          "Automation strategy",
          "Technology strategy",
          "Marketing transformation",
          "SEO transformation",
          "AI-search strategy",
          "AEO/GEO strategy",
          "MarTech consulting",
          "CRM transformation",
          "E-commerce growth consulting",
          "Growth strategy",
          "Digital business consulting",
        ],
      },
    ],
  },
];

export function serviceCount(division: Division) {
  return division.groups.reduce((sum, group) => sum + group.items.length, 0);
}

export function divisionsFor(practice: PracticeId) {
  return divisions.filter((d) => d.practice === practice);
}

/** Letter range label for a practice, e.g. "A–H" or "I · J · K". */
export function lettersFor(practice: PracticeId) {
  return divisionsFor(practice).map((d) => d.letter);
}
