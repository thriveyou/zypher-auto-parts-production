import ContactForm from "./ui/Contact-form";

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

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-24">
      <h1 className="text-3xl md:text-4xl font-semibold mb-2">Contact Us</h1>
      <p className="text-slate-600 mb-8">
        Questions about parts, availability, or an order? Send us a message.
      </p>
      <ContactForm />
    </main>
  );
}
