"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Bike } from "@/data/bikes";

export default function BikePhotoViewer({ bike, initialPhoto, onClose }: {
  bike: Bike;
  initialPhoto: number;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [photoIndex, setPhotoIndex] = useState(initialPhoto);
  const name = [bike.make, bike.model].filter(Boolean).join(" ");
  const photo = bike.photos[photoIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  const changePhoto = (step: number) => setPhotoIndex(index => (index + step + bike.photos.length) % bike.photos.length);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`bike-viewer-title-${bike.id}`}
      className="fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none items-center justify-center border-0 bg-transparent p-4 open:flex backdrop:bg-black/80"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          changePhoto(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className="flex h-[calc(100dvh-2rem)] max-h-[960px] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-slate-950 text-white shadow-2xl">
        <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3">
          <h2 id={`bike-viewer-title-${bike.id}`} className="text-sm font-semibold sm:text-base">{name}</h2>
          <button type="button" autoFocus onClick={onClose} aria-label="Close bike photo" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-2xl hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="relative min-h-0 flex-1">
          <Image src={photo.image} alt={photo.alt} fill sizes="(min-width:1056px) 1024px, calc(100vw - 32px)" className="object-contain" />
        </div>
        <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3">
          {bike.photos.length > 1 && <button type="button" onClick={() => changePhoto(-1)} className="min-h-11 rounded-lg px-3 text-sm hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white">Previous</button>}
          <p className="text-center text-xs text-slate-300" aria-live="polite" aria-atomic="true">Photo {photoIndex + 1} of {bike.photos.length}</p>
          {bike.photos.length > 1 && <button type="button" onClick={() => changePhoto(1)} className="min-h-11 rounded-lg px-3 text-sm hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white">Next</button>}
        </div>
      </div>
    </dialog>
  );
}
