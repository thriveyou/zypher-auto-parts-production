// app/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import LogoSection from "@/components/LogoSection";
import FeaturesSection from "@/components/FeaturesSection";
import OrderCTA from "@/components/OrderCta";
import PartsRequestSection from "@/components/PartsRequestSection";
import HowItWorks from "@/components/How-it-works";
import PartsShowcaseHeader from "@/components/PartsHeader";
import PartsShowcaseGrid from "@/components/Showcase-grid";
import ZypherBikes from "@/components/ZypherBikes";
import { pageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Japanese Vehicle Parts Sri Lanka | Zypher Imports",
  description:
    "Source genuine Japanese car and bike parts with Zypher Imports. Send your vehicle details for a quotation and delivery across Sri Lanka.",
  path: "/",
});

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.url}/#japanese-parts-import-service`,
  name: "Japanese vehicle parts importing service",
  provider: {
    "@id": `${siteConfig.url}/#business`,
  },
  areaServed: {
    "@type": "Country",
    name: "Sri Lanka",
  },
  serviceType: "Vehicle parts sourcing and importing",
  description:
    "OEM verified Japanese car and bike parts sourced from Japan and delivered to customers in Sri Lanka.",
};

export default function Page() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Hero />
      <LogoSection />
      <FeaturesSection />
      <OrderCTA />
      <HowItWorks />
      <section id="products" aria-labelledby="parts-showcase-heading" className="scroll-mt-6 bg-white py-14 md:py-20">
        <PartsShowcaseHeader />
        <PartsShowcaseGrid />
      </section>
      <ZypherBikes />
      <PartsRequestSection />
    </main>
  );
}
