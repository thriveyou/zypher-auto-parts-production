// app/page.tsx
import type { Metadata } from "next";
import Hero from '@/components/Hero';
import LogoSection from '@/components/LogoSection';
import FeaturesSection from '@/components/FeaturesSection';
import OrderCTA from '@/components/OrderCta';
import HowItWorks from '@/components/How-it-works';
import PartsShowcaseHeader from '@/components/PartsHeader';
import PartsShowcaseGrid from '@/components/Showcase-grid';

export const metadata: Metadata = {
  title: "Genuine Japanese Vehicle Parts in Sri Lanka",
  description:
    "Buy genuine Japanese car and bike parts in Sri Lanka. OEM verified, sourced from Japan, fast delivery islandwide. WhatsApp Zypher Imports to order.",
  alternates: {
    canonical: "https://www.zypherimports.lk/",
  },
  openGraph: {
    title: "Zypher Imports – Genuine Japanese Vehicle Parts in Sri Lanka",
    description:
      "OEM verified Japanese car and bike parts. Direct import from Japan. Fast delivery in Sri Lanka.",
    url: "https://www.zypherimports.lk/",
    siteName: "Zypher Imports",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zypher Imports – Genuine Japanese Vehicle Parts in Sri Lanka",
    description:
      "OEM verified Japanese car and bike parts. Direct import from Japan. Fast delivery in Sri Lanka.",
  },
};

export default function Page() {
  return (
    <main>
      <Hero />
      <LogoSection />
      <FeaturesSection />
      <OrderCTA />
      <HowItWorks />
      <PartsShowcaseHeader />
      <PartsShowcaseGrid />
    </main>
  );
}