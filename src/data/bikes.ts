import type { StaticImageData } from "next/image";
import pcxFront from "@/assets/bikes/pcx-front.png";
import pcxRear from "@/assets/bikes/pcx-rear.png";
import crfFront from "@/assets/bikes/crf250l-front.jpeg";
import crfCovered from "@/assets/bikes/crf250l-covered.jpeg";

export type Bike = {
  id: string;
  make: string;
  model: string;
  year?: number | null;
  engineCapacity?: string;
  description?: string;
  status?: string;
  photos: [{ image: StaticImageData; alt: string }, ...{ image: StaticImageData; alt: string }[]];
};

// Edit bike details here. Import new photos above from src/assets/bikes.
// Only include supplied details; leave unknown makes empty and years null.
// Photos for the same bike belong in its photos array; the first is the cover.
export const bikes: Bike[] = [
  {
    id: "honda-crf250l",
    make: "Honda",
    model: "CRF250L",
    year: null,
    description: "",
    status: "Imported from Japan",
    photos: [
      { image: crfCovered, alt: "Honda CRF250L under a cover bearing the Zypher Bikes Imports logo" },
      { image: crfFront, alt: "Red Honda CRF250L parked outdoors beside a scooter" },
    ],
  },
  {
    id: "pcx-2025",
    make: "Honda",
    model: "PCX",
    year: 2025,
    engineCapacity: "125cc",
    description: "",
    status: "Imported from Japan",
    photos: [
      { image: pcxFront, alt: "Honda PCX 2025 with protective wrapping, viewed from the front" },
      { image: pcxRear, alt: "Honda PCX 2025 viewed from the rear with its tail light on" },
    ],
  },
];
