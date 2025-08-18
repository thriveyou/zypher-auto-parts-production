import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoSection from '@/components/LogoSection';
import FeaturesSection from '@/components/FeaturesSection';
import OrderCTA from '@/components/OrderCta';
import HowItWorks from '@/components/How-it-works';
import PartsShowcaseHeader from '@/components/PartsHeader';
import PartsShowcaseGrid from '@/components/Showcase-grid';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main>
      <TopBar />
      <Navbar />
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