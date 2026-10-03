import type { Metadata } from "next";
import { pageMetadata, siteConfig } from "@/lib/seo";
import ContactForm from "./ui/Contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Parts Quotations Sri Lanka | Zypher Imports",
  description:
    "Request a quotation for Japanese car or bike parts. Contact Zypher Imports on WhatsApp, call our Sri Lanka team, or send your vehicle and part details.",
  path: "/Contact-Us",
});

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${siteConfig.url}/Contact-Us#contact`,
  url: `${siteConfig.url}/Contact-Us`,
  name: "Contact Zypher Imports",
  description:
    "Contact Zypher Imports for Japanese car and bike parts quotations, availability checks, and order support.",
  isPartOf: {
    "@id": `${siteConfig.url}/#website`,
  },
  about: {
    "@id": `${siteConfig.url}/#business`,
  },
  mainEntity: {
    "@id": `${siteConfig.url}/#business`,
  },
};

export default function ContactPage() {
  const whatsappText = encodeURIComponent(
    "Hi Zypher Imports, I need help with vehicle parts. Please assist.",
  );
  const japanWhatsappLink = `https://wa.me/817091117384?text=${whatsappText}`;

  return (
    <main id="main-content" tabIndex={-1} className="site-container-narrow min-h-screen py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <h1 className="mb-2 text-3xl font-semibold text-[#9A0111] md:text-4xl">
        Contact Us
      </h1>
      <p className="mb-8 text-slate-600">
        Questions about parts, availability, or an order? Send us a message.
      </p>

      <section className="mb-10" aria-labelledby="whatsapp-contact-heading">
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
            <WhatsAppIcon className="h-6 w-6 fill-current" />
          </div>
          <div>
            <h2
              id="whatsapp-contact-heading"
              className="text-base font-semibold text-slate-900"
            >
              WhatsApp Zypher Imports
            </h2>
            <p className="text-sm text-slate-600">
              Fastest way to get a reply. Send your part name or chassis
              number.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-900">WhatsApp</h3>
                  <span className="inline-flex items-center rounded-full bg-green-700 px-2.5 py-1 text-xs font-semibold text-white">
                    Main number
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  Best for Japan imports, sourcing updates, and part
                  availability.
                </p>
                <p className="mt-2 text-sm font-semibold text-green-800">
                  +81 70 9111 7384
                </p>
              </div>

              <a
                href={japanWhatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5 fill-current" />
                Message Us on WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">Local Hotline</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Call us for local follow-ups and Sri Lanka delivery support.
                </p>
                <p className="mt-2 text-sm font-medium text-slate-700">
                  +94 72 8000 516
                </p>
              </div>

              <a
                href="tel:+94728000516"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-green-500 hover:text-green-700 sm:w-auto"
              >
                <PhoneIcon className="h-5 w-5" />
                Local Hotline
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-600">
            Tip: Include <span className="font-medium">vehicle model</span>,{" "}
            <span className="font-medium">year</span>, and{" "}
            <span className="font-medium">a photo of the part</span> if you have
            one.
          </p>
        </div>
      </section>

      <p className="mb-6 text-sm text-slate-600">
        Or fill the form below, we will get back to you.
      </p>
      <ContactForm />
    </main>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className}>
      <path d="M19.11 17.62c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.27.18 1.75.11.53-.08 1.6-.65 1.82-1.27.23-.61.23-1.14.16-1.25-.07-.11-.25-.18-.52-.32ZM16.02 27.2h-.01c-1.86 0-3.68-.5-5.28-1.45l-.38-.23-3.92 1.03 1.05-3.82-.25-.39a10.99 10.99 0 0 1-1.69-5.86c0-6.07 4.94-11 11.02-11 2.94 0 5.7 1.15 7.78 3.23a10.93 10.93 0 0 1 3.23 7.77c0 6.07-4.94 11-11.55 11Zm9.36-20.35A13.2 13.2 0 0 0 16.03 3C8.67 3 2.68 8.98 2.68 16.34c0 2.38.63 4.71 1.82 6.76L2.5 30.3l7.36-1.93a13.26 13.26 0 0 0 6.17 1.52h.01c7.36 0 13.35-5.98 13.35-13.34 0-3.56-1.39-6.9-3.91-9.7Z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.89.7 2.78a2 2 0 0 1-.45 2.11L8.09 9.83a16 16 0 0 0 6.08 6.08l1.22-1.22a2 2 0 0 1 2.11-.45c.89.34 1.82.57 2.78.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}
