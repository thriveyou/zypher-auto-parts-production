import Image, { StaticImageData } from "next/image";

import part1 from "@/assets/vezel-gearbox.png";
import part2 from "@/assets/yamaha-headlight.png";
import part3 from "@/assets/prius-suspension-kit.jpg";


type Item = {
  img: StaticImageData;
  title: string;
  subtitle: string;
};

const items: Item[] = [
  { img: part1, title: "Honda Vezel Gearbox", subtitle: "Delivered to Colombo" },
  { img: part2, title: "Yamaha MT-25 Headlight", subtitle: "Delivered to Colombo" },
  { img: part3, title: "Toyota Prius Suspension Kit", subtitle: "Delivered to Colombo" },
];

export default function PartsShowcaseGrid() {
  return (
    <section id="products"
      className="
        my-10 mx-4 px-4
        md:my-12 md:mx-16 md:px-8
        xl:my-16 xl:mx-28 xl:px-12
      "
    >
      <div
        className="
          grid
          gap-6 sm:gap-8 md:gap-8 xl:gap-10
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        "
      >
        {items.map((it, i) => (
          <article key={i} className="p-3 md:p-4">
            <div
              className="
                relative w-full overflow-hidden rounded-xl
                h-64 sm:h-72 md:h-80 xl:h-96
                border-1 border-[#9A0111]
              "
            >
              <Image
                src={it.img}
                alt={it.title}
                fill
                className="object-cover"
                sizes="(min-width:1280px) 33vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                priority={i < 3}
              />
            </div>

            <h3
              className="
                mt-4 md:mt-5
                text-base md:text-lg
                font-semibold text-slate-800
              "
            >
              {it.title}
            </h3>
            <p
              className="
                mt-2
                text-sm md:text-sm
                font-medium text-[#9A0111]
              "
            >
              {it.subtitle}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
