import { FaWhatsapp } from "react-icons/fa";
import BikeCard from "@/components/BikeCard";
import { bikes } from "@/data/bikes";
import { siteConfig } from "@/lib/seo";

const message = "Hi, I'm looking for a motorcycle from Japan. Can you help me check availability?";
const whatsappUrl = `https://wa.me/${siteConfig.japanPhone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

export default function ZypherBikes() {
  return (
    <section id="zypher-bikes" aria-labelledby="zypher-bikes-heading" className="scroll-mt-8 border-y border-slate-200 bg-slate-50 py-14 md:py-20">
      <div className="site-container">
        <div className="max-w-3xl">
          <p className="text-xs font-bold tracking-[0.2em] text-zypher-red">ZYPHER BIKES</p>
          <h2 id="zypher-bikes-heading" className="mt-3 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
            Motorcycles Direct <span className="text-zypher-red">from Japan</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base">
            Looking for a motorcycle from Japan? Zypher Imports can help source
            motorcycles for customers in Sri Lanka. Tell us what you&apos;re looking
            for and our team can check available options in Japan.
          </p>
        </div>
        <p className="mb-6 mt-10 text-sm font-semibold text-slate-700">Some of the bikes we&apos;ve sourced from Japan.</p>
        <p className="mb-3 text-xs text-slate-600 sm:hidden">Swipe to see more bikes →</p>
        <div className="grid max-w-5xl gap-6 lg:grid-cols-[2fr_1fr]">
          <div role="region" aria-label="Imported motorcycle gallery" tabIndex={0} className="flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto rounded-2xl pb-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zypher-red sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0">
            {bikes.map((bike) => <BikeCard key={bike.id} bike={bike} />)}
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-zypher-red/20 bg-[#F8ECEE] p-5 md:p-6">
            <FaWhatsapp aria-hidden="true" className="mb-4 h-7 w-7 text-zypher-red" />
            <h3 className="text-xl font-semibold leading-tight text-slate-900">Looking for a Bike in Japan?</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Tell us the make and model you&apos;re looking for and we&apos;ll check available options.</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-zypher-red px-4 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#7E010E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zypher-red">
              <FaWhatsapp aria-hidden="true" className="h-5 w-5 shrink-0" />
              Ask About a Bike
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
