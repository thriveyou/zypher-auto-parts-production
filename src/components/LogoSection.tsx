import Image from "next/image";
import toyota from "@/assets/toyota.svg";
import lexus from "@/assets/lexus.svg";
import mazda from "@/assets/mazda.svg";
import subaru from "@/assets/subaru.webp";
import nissan from "@/assets/nissan.svg";
import suzuki from "@/assets/suzuki.svg";
import mitsubishi from "@/assets/mitsubishi.svg";
import daihatsu from "@/assets/daihatsu.svg";
import infiniti from "@/assets/infiniti.svg";

const logos = [
  { src: toyota, alt: "Toyota" },
  { src: lexus, alt: "Lexus" },
  { src: mazda, alt: "Mazda" },
  { src: subaru, alt: "Subaru" },
  { src: nissan, alt: "Nissan" },
  { src: suzuki, alt: "Suzuki" },
  { src: mitsubishi, alt: "Mitsubishi" },
  { src: daihatsu, alt: "Daihatsu" },
  { src: infiniti, alt: "Infiniti" },
];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="inline-flex items-center whitespace-nowrap shrink-0 flex-none"
      aria-hidden={ariaHidden}
    >
      {logos.map((l, i) => (
        <div
          key={i}
          className="
            relative flex-none
            h-14  w-24             
            sm:h-12 sm:w-28     
            md:h-16 md:w-36      
            lg:h-20 lg:w-44       
            xl:h-20 xl:w-40      
            mx-3 sm:mx-5 md:mx-6 lg:mx-8 xl:mx-10
          "
        >
          <Image
            src={l.src}
            alt={l.alt}
            fill
            loading="lazy"
            className="object-contain"
            sizes="
              (min-width:1280px) 10rem,
              (min-width:1024px) 11rem,
              (min-width:768px)  9rem,
              (min-width:640px)  7rem,
              6rem
            "
          />
        </div>
      ))}
    </div>
  );
}

export default function LogoSection() {
  return (
    <section aria-label="Vehicle brands we source parts for" className="logo-marquee w-full border-y border-gray-200 bg-white py-4 mt-16">
      <div className="relative w-full overflow-hidden">
        <div className="w-full px-4 sm:px-8
                        h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28
                        flex items-center">
          <div className="logo-marquee-track flex w-[200%] animate-[marqueeRight_25s_linear_infinite] will-change-transform">
            <Row />
            <Row ariaHidden />
          </div>
        </div>
      </div>
      <label className="mx-4 flex w-fit items-center gap-2 text-xs text-slate-600 sm:mx-8">
        <input type="checkbox" className="accent-slate-700" />
        Pause logo animation
      </label>
    </section>
  );
}
