import ContactForm from "./ui/Contact-form";


export default function ContactPage() {
  return (
    <main className="max-w-3xl min-h-screen  mx-auto px-10 py-24">
      <h1 className="text-3xl md:text-4xl text-[#9A0111] font-semibold mb-2">Contact Us</h1>
      <p className="text-slate-600 mb-8">
        Questions about parts, availability, or an order? Send us a message.
      </p>
      <ContactForm />
    </main>
  );
}
