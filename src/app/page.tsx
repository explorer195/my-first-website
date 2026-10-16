import { Hero } from "@/components/hero/hero";
import { Approach } from "@/components/sections/approach";
import { ContactCta } from "@/components/sections/contact-cta";
import { DivisionIndexSection } from "@/components/sections/division-index-section";
import { FaqSection } from "@/components/sections/faq-section";
import { Markets } from "@/components/sections/markets";
import { Positioning } from "@/components/sections/positioning";
import { Practices } from "@/components/sections/practices";
import { SearchStack } from "@/components/sections/search-stack";
import { StructuredData } from "@/components/seo/structured-data";

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Positioning />
      <SearchStack />
      <Practices />
      <DivisionIndexSection />
      <Markets />
      <Approach />
      <FaqSection />
      <ContactCta />
    </>
  );
}
