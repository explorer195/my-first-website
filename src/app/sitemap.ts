import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Add each new page here as the internal pages are built.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
