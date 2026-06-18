import type { Metadata } from "next";
import { saira } from "@/styles/fonts";
import { pageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Zypher Imports",
  description:
    "Learn how Zypher Imports sources genuine Japanese car and bike parts through teams in Japan and Sri Lanka, with OEM verification and reliable delivery.",
  path: "/About-Us",
});

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${siteConfig.url}/About-Us#about`,
  url: `${siteConfig.url}/About-Us`,
  name: "About Zypher Imports",
  description:
    "Zypher Imports connects Sri Lankan customers with genuine Japanese vehicle parts through sourcing, inspection, logistics, and local support.",
  isPartOf: {
    "@id": `${siteConfig.url}/#website`,
  },
  about: {
    "@id": `${siteConfig.url}/#business`,
  },
};

export default function AboutUs() {
  return (
    <main className="site-container-narrow bg-white text-slate-800 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-[#9A0111]">
            About Us
          </h1>
          <p className={`${saira.className} text-slate-600 max-w-3xl mx-auto`}>
            Zypher Imports is your trusted link to genuine vehicle parts,
            directly sourced from Japan and delivered safely to your doorstep in
            Sri Lanka.
          </p>
        </div>

        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            With years of experience and a passion for precision, we have built
            a reputation for reliability, speed, and affordability in the auto
            parts industry. Whether it is car or bike parts, we specialize in
            connecting our customers with high-quality components straight from
            Japanese suppliers. Our service is fast, secure, and tailored to
            meet the needs of vehicle owners, garages, and enthusiasts across
            Sri Lanka.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className={`${saira.className} text-[#9A0111] text-2xl`}>
            What We Do?
          </h3>
          <p className="text-lg leading-relaxed">
            We take the hassle out of importing vehicle parts. When you place an
            order with Zypher, our team in Japan handles the sourcing and
            quality verification of genuine parts. The order is then swiftly
            processed, packed, and shipped to Sri Lanka, where our local team
            ensures smooth final delivery. From rare components to everyday
            essentials, we help keep your vehicles running smoothly with parts
            you can trust.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className={`${saira.className} text-[#9A0111] text-2xl`}>
            Our Team
          </h3>
          <p className="text-lg leading-relaxed">
            Zypher Imports operates with two dedicated teams - one based in
            Japan and the other in Sri Lanka.
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>
              <span className="font-semibold">
                Our{" "}
                <span className={`${saira.className} text-[#9A0111]`}>
                  Japan
                </span>{" "}
                Team
              </span>{" "}
              is responsible for procurement, inspection, and logistics,
              working closely with trusted suppliers and manufacturers.
            </li>
            <li>
              <span className="font-semibold">
                Our{" "}
                <span className={`${saira.className} text-[#9A0111]`}>
                  Sri Lanka
                </span>{" "}
                Team
              </span>{" "}
              manages customer service, customs clearance, and final delivery,
              ensuring every order reaches you efficiently and safely.
            </li>
          </ul>
          <p className="text-lg leading-relaxed">
            This cross-border collaboration allows us to offer a seamless
            experience from order to delivery, with real-time communication and
            support.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className={`${saira.className} text-[#9A0111] text-2xl`}>
            Why Choose Zypher?
          </h3>
          <ul className="grid md:grid-cols-2 gap-4 text-lg">
            <li>Genuine Parts Only - No imitations, no compromises.</li>
            <li>Fast, Reliable Shipping - From Japan to Sri Lanka.</li>
            <li>Personalized Service - Friendly support & updates.</li>
            <li>Affordable Pricing - Competitive rates, no hidden fees.</li>
            <li>Years of Experience - Trusted nationwide.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className={`${saira.className} text-[#9A0111] text-2xl`}>
            Our Promise
          </h3>
          <p className="text-lg leading-relaxed">
            We are committed to making high-quality vehicle parts accessible to
            everyone in Sri Lanka. Whether you&apos;re an individual buyer or a
            workshop owner, Zypher Imports is here to provide you with a smooth,
            secure, and satisfying experience.
          </p>
        </div>
      </div>
    </main>
  );
}
