"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import PhotoViewer from "@/components/PhotoViewer";

import dynomaxParts from "@/assets/dynomax-turbo-muffler-parts.jpeg";
import priusSuspension from "@/assets/prius-suspension-kit.jpg";
import exedyClutch from "@/assets/exedy-clutch-parts.jpg";

type Item = {
  img: StaticImageData;
  title: string;
  subtitle: string;
  alt?: string;
};

// Add or update deliveries here. Only include confirmed product and delivery details.
const items: Item[] = [
  {
    img: dynomaxParts,
    title: "Dynomax Turbo Muffler & Parts",
    subtitle: "Delivered to Colombo",
    alt: "Imported Dynomax turbo muffler, BMW touch-up pen and grease displayed on a car bonnet",
  },
  {
    img: exedyClutch,
    title: "Genuine EXEDY Clutch Parts",
    subtitle: "Delivered to Colombo",
  },
  {
    img: priusSuspension,
    title: "Toyota Prius Suspension Kit",
    subtitle: "Delivered to Colombo",
  },
];

export default function PartsShowcaseGrid() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="site-container mt-7 md:mt-8">
      <p className="mb-3 text-xs text-slate-500 md:hidden">Swipe to explore deliveries →</p>
      <div
        role="region"
        aria-label="Delivered parts gallery"
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-2xl pb-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zypher-red md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0 xl:gap-7"
      >
        {items.map(item => (
          <article key={item.title} className="group flex min-w-0 shrink-0 basis-[88%] snap-start flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-md sm:basis-[60%] md:basis-auto">
            <button
              type="button"
              aria-label={`Enlarge ${item.title} photo`}
              aria-haspopup="dialog"
              onClick={() => setSelectedItem(item)}
              className="relative block aspect-[4/3] w-full shrink-0 cursor-zoom-in overflow-hidden bg-slate-100 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-zypher-red"
            >
              <Image
                src={item.img}
                alt={item.alt ?? item.title}
                fill
                className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.025]"
                sizes="(min-width:1440px) 428px, (min-width:1280px) calc((100vw - 158px) / 3), (min-width:768px) calc((100vw - 110px) / 3), (min-width:640px) calc((100vw - 32px) * 0.6), calc((100vw - 32px) * 0.88)"
                loading="lazy"
                placeholder="blur"
              />
              <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/95 text-slate-800 shadow-sm transition-colors group-hover:text-zypher-red">
                <FiArrowUpRight className="h-5 w-5" />
              </span>
            </button>
            <div className="flex flex-1 flex-col p-4 lg:p-5">
              <h3 className="text-base font-semibold leading-6 text-slate-950 lg:text-lg lg:leading-7">{item.title}</h3>
              <p className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-600 lg:text-sm">
                <span aria-hidden="true" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zypher-red/5 text-zypher-red">
                  <FiCheck className="h-3 w-3" />
                </span>
                {item.subtitle}
              </p>
            </div>
          </article>
        ))}
      </div>
      {selectedItem && (
        <PhotoViewer
          title={selectedItem.title}
          photos={[{ image: selectedItem.img, alt: selectedItem.alt ?? selectedItem.title }]}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
