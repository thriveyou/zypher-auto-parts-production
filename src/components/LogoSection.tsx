import Image from "next/image";
import logoIsuzu from "@/assets/logo-isuzu.png";
import logoPorsche from "@/assets/logo-porsche.png";
import logoDacia from "@/assets/logo-dacia.png";
import logoPeugeot from "@/assets/logo-peugeot.png";
import logoHonda from "@/assets/logo-honda.png";
import logoTesla from "@/assets/logo-tesla.png";


export default function LogoSection() {
  return (
    <section className="w-full border-y border-gray-200 bg-white py-6 mt-16 overflow-hidden">
      <div className="w-full flex items-center justify-between px-8">
        <Image src={logoIsuzu} alt="Isuzu" className="h-12 w-auto object-contain" />
        <Image src={logoPorsche} alt="Porsche" className="h-12 w-auto object-contain" />
        <Image src={logoDacia} alt="Dacia" className="h-12 w-auto object-contain" />
        <Image src={logoPeugeot} alt="Peugeot" className="h-12 w-auto object-contain" />
        <Image src={logoHonda} alt="Honda" className="h-12 w-auto object-contain" />
        <Image src={logoTesla} alt="Tesla" className="h-12 w-auto object-contain" />
      </div>
    </section>
  );
}
