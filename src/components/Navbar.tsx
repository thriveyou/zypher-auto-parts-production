"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo-no-bg-cropped.png";

const nav = [
  { href: "/", label: "HOME" },
  { href: "/About-Us", label: "ABOUT US" },
  { href: "/#products", label: "SHOWCASE" },
  { href: "/#zypher-bikes", label: "ZYPHER BIKES" },
  { href: "/Contact-Us", label: "CONTACT" },
];

const partsRequestUrl = "https://parts.zypherimports.lk/request-form";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="site-container mt-3 md:mt-4">
      <div className="flex items-center justify-between rounded-xl shadow bg-[#9A0111] h-16 md:h-20 xl:h-28 px-4 md:px-6">
        <Link href="/" aria-label="Zypher Imports" className="shrink-0">
          <Image
            src={logo}
            alt="Zypher Imports"
            width={1757}
            height={990}
            sizes="(min-width:1280px) 114px, (min-width:768px) 85px, 71px"
            className="h-10 md:h-12 xl:h-16 w-auto object-contain"
            loading="eager"
          />
        </Link>


        <nav aria-label="Main" className="ml-4 md:ml-6 hidden lg:block">
          <ul className="flex items-center justify-end gap-x-2 xl:gap-x-5 text-sm xl:text-base font-semibold">
            {nav.map((item) => {
              const isActive = pathname === item.href; 
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-2.5 py-2 xl:px-3 rounded transition whitespace-nowrap ${
                      isActive ? "text-white" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={partsRequestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-white px-4 py-2 font-bold text-[#9A0111] shadow-sm transition hover:bg-white/90"
              >
                REQUEST A PART
              </a>
            </li>
          </ul>
        </nav>


        <button
          ref={menuButtonRef}
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="31" height="31" viewBox="0 0 31 31" fill="none">
            <path
              d="M5.16666 7.75L25.8333 7.75M12.2708 15.5L25.8333 15.5M5.16666 23.25L25.8333 23.25"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

 
      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            menuButtonRef.current?.focus();
          }
        }}
        className={`lg:hidden transition-[max-height,opacity] duration-200 ease-out overflow-hidden ${
          open ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-xl shadow bg-[#9A0111] px-3 py-3">
          <nav aria-label="Mobile">
            <ul className="flex flex-col divide-y divide-white/10 font-semibold">
              {nav.map((item) => {
                const isActive = pathname === item.href; 
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-3 rounded transition ${
                        isActive ? "text-white" : "text-gray-300 hover:text-white"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href={partsRequestUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center rounded-lg bg-white px-3 py-3 text-[#9A0111] transition hover:bg-white/90"
                  onClick={() => setOpen(false)}
                >
                  REQUEST A PART
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
