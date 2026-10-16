export type SearchLayer = {
  id: "seo" | "aeo" | "geo" | "ai";
  letter: string;
  acronym: string;
  name: string;
  title: string;
  body: string;
};

// The four separate search disciplines (divisions A–D), in the order a
// customer's question now travels: results, answers, generated answers, AI platforms.
export const searchLayers: SearchLayer[] = [
  {
    id: "seo",
    letter: "A",
    acronym: "SEO",
    name: "Search Engine Optimization",
    title: "Rank where people search.",
    body: "Technical, content and authority work that earns durable rankings, from local and multi-location to enterprise and international sites.",
  },
  {
    id: "aeo",
    letter: "B",
    acronym: "AEO",
    name: "Answer Engine Optimization",
    title: "Become the direct answer.",
    body: "Question research, answer-first content and structured data built for featured snippets, People Also Ask and voice results.",
  },
  {
    id: "geo",
    letter: "C",
    acronym: "GEO",
    name: "Generative Engine Optimization",
    title: "Earn citations in generated answers.",
    body: "Entity, knowledge-source and citation strategy that improves how generative engines represent and reference your brand.",
  },
  {
    id: "ai",
    letter: "D",
    acronym: "AI Search",
    name: "AI Search Optimization",
    title: "Stay visible across AI platforms.",
    body: "Visibility audits, recommendation and citation monitoring, and competitor tracking across the AI systems your customers use.",
  },
];

export const aiPlatforms = [
  "Google AI Overviews",
  "ChatGPT",
  "Perplexity",
  "Gemini",
  "Microsoft Copilot",
  "Claude",
] as const;
