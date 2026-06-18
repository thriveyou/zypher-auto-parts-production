import type { Metadata } from "next";
import { pageMetadata, siteConfig } from "@/lib/seo";
import ContactForm from "./ui/Contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact Zypher Imports",
  description:
    "Contact Zypher Imports in Sri Lanka by WhatsApp or form to request genuine Japanese vehicle parts, quotations, availability, and order support.",
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
  const whatsappNumber = "94728000516";
  const whatsappText = encodeURIComponent(
    "Hi Zypher Imports, I need help with vehicle parts. Please assist.",
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  return (
    <main className="site-container-narrow min-h-screen py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <h1 className="text-3xl md:text-4xl text-[#9A0111] font-semibold mb-2">
        Contact Us
      </h1>
      <p className="text-slate-600 mb-8">
        Questions about parts, availability, or an order? Send us a message.
      </p>

      <div className="mb-10 rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
              <span className="text-sm font-semibold text-green-700" aria-hidden>
                WA
              </span>
            </div>

            <div>
              <p className="text-base font-semibold text-slate-900">
                WhatsApp Zypher Imports
              </p>
              <p className="text-sm text-slate-600">
                Fastest way to get a reply. Send your part name or chassis
                number.
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  +94 72 8000 516
                </span>
                <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  Usually replies quickly
                </span>
              </div>
            </div>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 transition"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              className="h-5 w-5 fill-white"
            >
              <path d="M19.11 17.62c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.27.18 1.75.11.53-.08 1.6-.65 1.82-1.27.23-.61.23-1.14.16-1.25-.07-.11-.25-.18-.52-.32ZM16.02 27.2h-.01c-1.86 0-3.68-.5-5.28-1.45l-.38-.23-3.92 1.03 1.05-3.82-.25-.39a10.99 10.99 0 0 1-1.69-5.86c0-6.07 4.94-11 11.02-11 2.94 0 5.7 1.15 7.78 3.23a10.93 10.93 0 0 1 3.23 7.77c0 6.07-4.94 11-11.55 11Zm9.36-20.35A13.2 13.2 0 0 0 16.03 3C8.67 3 2.68 8.98 2.68 16.34c0 2.38.63 4.71 1.82 6.76L2.5 30.3l7.36-1.93a13.26 13.26 0 0 0 6.17 1.52h.01c7.36 0 13.35-5.98 13.35-13.34 0-3.56-1.39-6.9-3.91-9.7Z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-600">
            Tip: Include <span className="font-medium">vehicle model</span>,{" "}
            <span className="font-medium">year</span>, and{" "}
            <span className="font-medium">a photo of the part</span> if you have
            one.
          </p>
        </div>
      </div>
      <p className="mb-6 text-sm text-slate-600">
        Or fill the form below, we will get back to you.
      </p>
      <ContactForm />
    </main>
  );
}
