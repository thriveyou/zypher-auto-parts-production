import ContactForm from "./ui/Contact-form";

export const metadata = {
  title: "Contact Us — Zypher Auto Parts",
  description: "Get in touch with Zypher Auto Parts.",
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
