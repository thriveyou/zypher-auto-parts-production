"use client";

import { useEffect, useRef } from "react";
import { saira } from "@/styles/fonts";
import Image from "next/image";
import logo from "@/assets/Zypher.png"; 

export default function PopupModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={[
        "fixed inset-0 z-[100] flex items-center justify-center p-4",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-0 bg-black/60 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />

      <div
        ref={panelRef}
        className={[
          "relative z-10 w-[92vw] max-w-none sm:w-auto sm:max-w-2xl md:max-w-2xl",
          "min-h-[300px] md:min-h-[500px] max-h-[85vh] overflow-y-auto",
          "rounded-2xl bg-white shadow-2xl overflow-hidden",
          "transition-transform duration-300 ease-out",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0",
        ].join(" ")}
      >
        <div className="relative bg-[#9A0111] flex justify-center items-center py-10 md:py-12">
          <Image src={logo} alt="Logo" width={120} height={120} className="mx-auto" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 rounded-full p-2 hover:bg-white/20"
          >
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              className="text-white"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center text-center px-8 md:px-16 py-20 md:py-20 h-full">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900">
            Direct Deals, Maximum <span className={`${saira.className} text-[#9A0111]`}>Savings.</span>
          </h3>
          <p className="mt-6 text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-700">
            Save More. No Middlemen. Direct from <span className={`${saira.className} text-[#9A0111]`}>Japan.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
