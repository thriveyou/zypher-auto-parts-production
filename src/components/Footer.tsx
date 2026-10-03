import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaTiktok,
} from "react-icons/fa6";
import logo from "@/assets/logo-no-bg-cropped.png";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/About-Us", label: "About Us" },
  { href: "/#products", label: "Parts Showcase" },
  { href: "/Contact-Us", label: "Contact" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/share/12HyqbrRiZu/?mibextid=wwXIfr",
    label: "Facebook",
    icon: FaFacebookF,
  },
  {
    href: "https://www.tiktok.com/@zypherauto",
    label: "TikTok",
    icon: FaTiktok,
  },
  {
    href: "https://www.instagram.com/zypherauto",
    label: "Instagram",
    icon: FaInstagram,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="site-container py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_1.1fr]">
          <div>
            <Link href="/" aria-label="Zypher Imports" className="inline-flex">
              <Image
                src={logo}
                alt="Zypher Imports"
                width={1757}
                height={990}
                sizes="(min-width:768px) 170px, 150px"
                className="h-auto w-[150px] md:w-[170px]"
                loading="lazy"
              />
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              Your trusted partner for genuine vehicle parts, specializing in
              direct Japan imports, OEM verification, and islandwide delivery in
              Sri Lanka.
            </p>

            <div className="mt-6 max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Registered Business
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                Zypher Imports (Pvt) Ltd.
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Company Registration No. PV00360276
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
              Quick Links
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://parts.zypherimports.lk/request-form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-md bg-[#9A0111] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#b41515]"
                >
                  Request a Quote
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-white">
              Contact
            </h2>
            <div className="mt-6 space-y-5 text-sm text-slate-300">
              <ContactRow icon={FaPhone}>
                <div className="flex flex-col gap-1">
                  <a href="tel:+94728000516" className="transition hover:text-white">
                    +94 72 8000 516
                  </a>
                  <a href="tel:+817091117384" className="transition hover:text-white">
                    +81 70-9111-7384
                  </a>
                </div>
              </ContactRow>

              <ContactRow icon={FaEnvelope}>
                <div className="flex flex-col gap-1">
                  <a
                    href="mailto:contact@zypherimports.lk"
                    className="transition hover:text-white"
                  >
                    contact@zypherimports.lk
                  </a>
                  <a
                    href="mailto:zypherimports@gmail.com"
                    className="text-slate-400 transition hover:text-white"
                  >
                    zypherimports@gmail.com
                  </a>
                </div>
              </ContactRow>

              <ContactRow icon={FaLocationDot}>
                <span>
                  400/5, High Level Road, Galadara - Padukka Rd, Padukka 10500,
                  Sri Lanka
                </span>
              </ContactRow>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                Follow Us
              </p>
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-400 md:flex-row md:text-left">
            <p>
              &copy; {new Date().getFullYear()} Zypher Imports (Pvt) Ltd. All
              rights reserved.
            </p>
            <p>
              Powered by{" "}
              <a
                href="https://www.thrivesolutions.digital/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white transition hover:text-slate-200"
              >
                Thrive
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactRow({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-300">
        <Icon className="h-4 w-4" />
      </span>
      <div className="leading-6">{children}</div>
    </div>
  );
}
