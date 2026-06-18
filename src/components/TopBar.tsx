import { FaWhatsapp } from "react-icons/fa6";

const whatsappText = encodeURIComponent(
  "Hi Zypher Imports, I need help with vehicle parts. Please assist.",
);

export function UtilityBar() {
  return (
    <div className="hidden border-b border-gray-100 bg-white sm:block">
      <div className="mx-auto flex max-w-7xl justify-end gap-2 px-4 py-2.5 text-sm text-gray-600 sm:gap-3">
        <a
          href="mailto:contact@zypherimports.lk"
          className="hidden items-center gap-2 rounded-md px-2 py-1 transition hover:bg-slate-50 hover:text-zypher-red sm:inline-flex"
        >
          <MailIcon />
          contact@zypherimports.lk
        </a>

        <a
          href="mailto:contact@zypherimports.lk"
          aria-label="Email Zypher Imports"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 hover:text-zypher-red sm:hidden"
        >
          <MailIcon />
        </a>

        <a
          href={`https://wa.me/817091117384?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Zypher Imports on WhatsApp"
          className="inline-flex items-center gap-2 rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-green-700 sm:text-sm"
        >
          <FaWhatsapp className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function TopBar() {
  return (
    <>
      <UtilityBar />
      <MobileWhatsAppButton />
    </>
  );
}

function MobileWhatsAppButton() {
  return (
    <a
      href={`https://wa.me/817091117384?text=${whatsappText}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Zypher Imports on WhatsApp"
      className="fixed bottom-4 right-4 z-50 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-green-600 text-white shadow-lg shadow-green-900/25 transition hover:bg-green-700 sm:hidden"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="14" height="10" rx="2" />
      <path d="m4 6 6 5 6-5" />
    </svg>
  );
}
