export type FaqItem = {
  question: string;
  answer: string;
};

// Written answer-first, the way we structure answers for clients.
// These items are also published as FAQPage structured data.
export const faq: FaqItem[] = [
  {
    question: "What is the difference between SEO, AEO and GEO?",
    answer:
      "SEO (search engine optimization) improves how your pages rank in traditional search results. AEO (answer engine optimization) structures your content so it can be used as a direct answer in featured snippets, People Also Ask and voice results. GEO (generative engine optimization) focuses on how generative AI systems describe, recommend and cite your brand. We run them as separate disciplines, with separate deliverables and reporting, coordinated in one program.",
  },
  {
    question: "What is AI search optimization?",
    answer:
      "AI search optimization covers your visibility across the wider AI discovery ecosystem, including Google's AI search experiences such as AI Overviews where available, ChatGPT, Perplexity, Gemini, Microsoft Copilot and Claude. It combines visibility audits, recommendation and citation monitoring, competitor analysis, and content and entity strategy.",
  },
  {
    question:
      "Can you guarantee my brand will appear in ChatGPT or Google AI Overviews?",
    answer:
      "No, and be cautious of anyone who does. Generative search is still evolving and no agency controls how AI systems respond. What we can do is strengthen the signals these systems rely on, monitor how your brand appears, and report on the evidence: mentions, citations, how often you appear in answers to the questions that matter, and the leads that follow.",
  },
  {
    question: "What does an AI agent actually do for a business?",
    answer:
      "An AI agent completes multi-step work inside your business systems, for example qualifying a new lead, booking an appointment, sending a follow-up, updating your CRM or preparing a report. We design each agent around a specific workflow, with clear permissions, human oversight where it matters and measurable outcomes.",
  },
  {
    question: "Which markets do you work in?",
    answer:
      "Our primary markets are the United States, the United Kingdom, Canada, Australia, the United Arab Emirates and Saudi Arabia. Additional markets include Qatar, Kuwait, Oman, Bahrain, Germany, the Netherlands, Switzerland, France, Ireland, Sweden, Norway, Denmark, New Zealand and Singapore.",
  },
  {
    question: "Do you work with agencies and technology partners?",
    answer:
      "Yes. We offer white-label delivery for agencies and partner with technology companies on implementation, so your clients get specialist SEO, AI and engineering capability under your brand.",
  },
];
