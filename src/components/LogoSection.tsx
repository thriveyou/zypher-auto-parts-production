import Image from "next/image";
import logoIsuzu from "@/assets/logo-isuzu.png";
import logoPorsche from "@/assets/logo-porsche.png";
import logoDacia from "@/assets/logo-dacia.png";
import logoPeugeot from "@/assets/logo-peugeot.png";
import logoHonda from "@/assets/logo-honda.png";
import logoTesla from "@/assets/logo-tesla.png";

const logos = [
  { src: logoIsuzu, alt: "Isuzu" },
  { src: logoPorsche, alt: "Porsche" },
  { src: logoDacia, alt: "Dacia" },
  { src: logoPeugeot, alt: "Peugeot" },
  { src: logoHonda, alt: "Honda" },
  { src: logoTesla, alt: "Tesla" },
];

function Row() {
  return (
    <div className="inline-flex items-center whitespace-nowrap shrink-0 flex-none">
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
            className="object-contain"
            sizes="
              (min-width:1280px) 14rem,
              (min-width:1024px) 11rem,
              (min-width:768px)  9rem,
              (min-width:640px)  7rem,
              5rem
            "
          />
        </div>
      ))}
    </div>
  );
}

export default function LogoSection() {
  return (
    <section className="w-full border-y border-gray-200 bg-white py-4 mt-16">
      <div className="relative w-full overflow-hidden">
        <div className="w-full px-4 sm:px-8
                        h-14 sm:h-16 md:h-20 lg:h-24 xl:h-28
                        flex items-center">
          <div className="flex w-[200%] animate-[marqueeRight_25s_linear_infinite] will-change-transform">
            <Row />
            <Row aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
