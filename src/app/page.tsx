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
import { absoluteUrl, pageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Genuine Japanese Vehicle Parts in Sri Lanka",
  description:
    "Order OEM verified Japanese car and bike parts in Sri Lanka. Zypher Imports sources genuine parts from Japan and delivers islandwide.",
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
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Vehicle parts available through Zypher Imports",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Honda Vezel Gearbox",
          category: "Vehicle transmission parts",
          image: absoluteUrl("/og.jpg"),
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Genuine EXEDY Clutch Parts",
          category: "Vehicle clutch parts",
          image: absoluteUrl("/og.jpg"),
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Toyota Prius Suspension Kit",
          category: "Vehicle suspension parts",
          image: absoluteUrl("/og.jpg"),
        },
      },
    ],
  },
};

export default function Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Hero />
      <LogoSection />
      <FeaturesSection />
      <OrderCTA />
      <PartsRequestSection />
      <HowItWorks />
      <PartsShowcaseHeader />
      <PartsShowcaseGrid />
    </main>
  );
}
