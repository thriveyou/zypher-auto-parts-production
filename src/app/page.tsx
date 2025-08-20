
import Hero from '@/components/Hero';
import LogoSection from '@/components/LogoSection';
import FeaturesSection from '@/components/FeaturesSection';
import OrderCTA from '@/components/OrderCta';
import HowItWorks from '@/components/How-it-works';
import PartsShowcaseHeader from '@/components/PartsHeader';
import PartsShowcaseGrid from '@/components/Showcase-grid';
import Footer from '@/components/Footer';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zypher Auto Parts – Genuine Vehicle Parts Sri Lanka",
  description:
    "Get in touch with Zypher Auto Parts for genuine Japanese car and bike parts. Fast response, support, and direct import ordering assistance.",
  keywords: [
    "Zypher Auto Parts contact",
    "auto parts inquiry Sri Lanka",
    "genuine vehicle parts support",
    "buy car parts Sri Lanka",
    "Japanese bike parts Sri Lanka",
  ],
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
      <Footer />


    </main>
  );
}