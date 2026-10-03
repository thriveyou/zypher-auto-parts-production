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
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      id="direct-import-modal"
      aria-labelledby="direct-import-title"
      className="fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none border-0 bg-transparent p-4 open:flex items-center justify-center backdrop:bg-black/60"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div
        className={[
          "relative z-10 w-[92vw] max-w-none sm:w-auto sm:max-w-2xl md:max-w-2xl",
          "min-h-[300px] md:min-h-[500px] max-h-[85vh] overflow-y-auto",
          "rounded-2xl bg-white shadow-2xl",
          "transition-transform duration-300 ease-out motion-reduce:transition-none",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0",
        ].join(" ")}
      >
        <div className="relative bg-[#9A0111] flex justify-center items-center py-10 md:py-12">
          <Image src={logo} alt="Zypher Imports" width={138} height={49} sizes="120px" className="mx-auto h-auto w-[120px]" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            autoFocus
            className="absolute top-3 right-3 rounded-full p-2 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-white"
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
          <h2 id="direct-import-title" className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900">
            Direct Deals, Maximum <span className={`${saira.className} text-[#9A0111]`}>Savings.</span>
          </h2>
          <p className="mt-6 text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-700">
            Save More. No Middlemen. Direct from <span className={`${saira.className} text-[#9A0111]`}>Japan.</span>
          </p>
        </div>
      </div>
    </dialog>
  );
}
