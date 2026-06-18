import type { Metadata } from "next";
import {
  FaCircleCheck,
  FaGlobe,
  FaLocationDot,
  FaMagnifyingGlass,
  FaShieldHalved,
  FaTruckFast,
} from "react-icons/fa6";
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

const highlights = [
  { value: "Japan", label: "direct sourcing network" },
  { value: "OEM", label: "verification focused" },
  { value: "LK", label: "islandwide support" },
];

const process = [
  {
    title: "Source",
    text: "We search through trusted Japanese suppliers, dealers, and auction channels.",
    icon: FaMagnifyingGlass,
  },
  {
    title: "Verify",
    text: "Parts are checked for fit, authenticity, and condition before confirmation.",
    icon: FaShieldHalved,
  },
  {
    title: "Deliver",
    text: "Our Sri Lanka team coordinates customs, updates, and final handover.",
    icon: FaTruckFast,
  },
];

const values = [
  "Genuine parts only, with no imitation shortcuts.",
  "Clear updates from request to delivery.",
  "Support for individual buyers, garages, and workshops.",
  "Sourcing help for rare, everyday, car, and bike parts.",
];

export default function AboutUs() {
  return (
    <main className="bg-white text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <section className="site-container py-12 md:py-18 lg:py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#9A0111]">
            About Zypher Imports
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
            Your trusted link to genuine vehicle parts from{" "}
            <span className={`${saira.className} text-[#9A0111]`}>Japan</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Zypher Imports connects customers in Sri Lanka with genuine car and
            bike parts sourced directly from Japan. We handle sourcing,
            verification, importing, and final delivery so every order feels
            clear and dependable.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4"
            >
              <p className={`${saira.className} text-2xl font-bold text-[#9A0111]`}>
                {item.value}
              </p>
              <p className="mt-1 text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50">
        <div className="site-container py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9A0111]">
              What We Do
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
              We make importing vehicle parts simpler
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              From rare components to everyday essentials, our process is built
              around accuracy, communication, and reliable delivery.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {process.map(({ title, text, icon: Icon }) => (
              <article
                key={title}
                className="rounded-lg border border-slate-200 bg-white p-5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#9A0111] text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <TeamPanel
            icon={FaGlobe}
            title="Japan Team"
            text="Our Japan-side team manages procurement, supplier coordination, inspection, and logistics. They help identify the right parts and verify options before shipping."
          />
          <TeamPanel
            icon={FaLocationDot}
            title="Sri Lanka Team"
            text="Our Sri Lanka-side team handles customer support, order updates, customs coordination, and final delivery so customers always know what is happening."
          />
        </div>
      </section>

      <section className="site-container pb-16 md:pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9A0111]">
              Our Promise
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
              Parts you can trust, with support you can reach
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Whether you are an individual buyer or workshop owner, Zypher
              Imports is here to make genuine Japanese vehicle parts more
              accessible across Sri Lanka.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value}
                className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4"
              >
                <FaCircleCheck className="mt-1 h-4 w-4 shrink-0 text-[#9A0111]" />
                <p className="text-sm leading-6 text-slate-700">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function TeamPanel({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FFE8E8] text-[#9A0111]">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-xl font-bold text-slate-950">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
        </div>
      </div>
    </article>
  );
}
