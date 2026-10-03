"use client";

import { useState } from "react";
import Image from "next/image";
import PhotoViewer from "@/components/PhotoViewer";
import type { Bike } from "@/data/bikes";

export default function BikeCard({ bike }: { bike: Bike }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const name = [bike.make, bike.model].filter(Boolean).join(" ");
  const title = [[name, bike.year].filter(Boolean).join(" "), bike.engineCapacity].filter(Boolean).join(" · ");
  const photo = bike.photos[activePhoto];

  return (
    <article className="min-w-0 shrink-0 basis-[calc(100%-1.5rem)] snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md sm:basis-auto">
      <button
        type="button"
        id={`bike-photo-${bike.id}`}
        aria-label={`Enlarge ${name} photo ${activePhoto + 1}`}
        aria-haspopup="dialog"
        onClick={() => setViewerOpen(true)}
        className="relative block h-64 w-full cursor-zoom-in bg-slate-950 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white sm:h-72"
      >
        <Image
          src={photo.image}
          alt={photo.alt}
          fill
          sizes="(min-width:1024px) 324px, (min-width:768px) calc((100vw - 90px) / 2), (min-width:640px) calc((100vw - 58px) / 2), calc(100vw - 58px)"
          className="object-contain"
          loading="lazy"
          placeholder="blur"
        />
      </button>
      <div className="p-4">
        <h3 className="text-base font-bold text-slate-950">{title}</h3>
        {bike.description && (
          <p className="mt-1 text-sm text-slate-600">
            {bike.description}
          </p>
        )}
        {bike.status && <p className="mt-2 text-sm font-semibold text-zypher-red">{bike.status}</p>}
        {bike.photos.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={`${name} photos`}>
            {bike.photos.map((item, index) => (
              <button
                key={item.image.src}
                type="button"
                aria-label={`View photo ${index + 1} of ${name}`}
                aria-pressed={index === activePhoto}
                aria-controls={`bike-photo-${bike.id}`}
                onClick={() => setActivePhoto(index)}
                className={`relative h-12 w-11 overflow-hidden rounded-md border-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zypher-red ${index === activePhoto ? "border-zypher-red" : "border-slate-200 hover:border-slate-500"}`}
              >
                <Image src={item.image} alt="" fill sizes="44px" className="object-contain bg-slate-950" loading="lazy" />
              </button>
            ))}
            <span className="self-center pl-1 text-xs text-slate-600" aria-live="polite" aria-atomic="true">
              Photo {activePhoto + 1} of {bike.photos.length}
            </span>
          </div>
        )}
      </div>
      {viewerOpen && <PhotoViewer title={name} photos={bike.photos} initialPhoto={activePhoto} onClose={() => setViewerOpen(false)} />}
    </article>
  );
}
