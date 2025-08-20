import Image from "next/image";
import carTop from "@/assets/How-it-works-banner.png";

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 py-3 md:gap-3 md:py-3 xl:gap-3 xl:py-3">
      <span className="inline-flex h-7 w-7 md:h-7 md:w-7 xl:h-8 xl:w-8 shrink-0 items-center justify-center rounded-full bg-[#4B0008] text-[#ffffff] text-[10px] md:text-[10px] xl:text-xs font-bold">
        {n}
      </span>

      <div className="border-b border-[#FF2B2B] w-3/4 pb-2">
        <h4 className="font-semibold text-slate-900 text-base md:text-base xl:text-lg">
          {title}
        </h4>
        <p className="text-slate-600 mt-1 text-sm md:text-sm xl:text-base">
          {text}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="my-8 mx-4 px-3 md:my-10 md:mx-16 md:px-4 xl:my-10 xl:mx-28 xl:px-4">
      <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8 xl:gap-1">
        <div className="flex items-center justify-center gap-4 md:gap-8 xl:gap-4">
          <span className="rotate-180 [writing-mode:vertical-rl] text-slate-800 font-bold tracking-wide text-3xl md:text-4xl lg:text-5xl xl:text-7xl">
            How it works
          </span>
          <Image
            src={carTop}
            alt="Top view car"
            width={320}
            height={320}
            priority
            className="
    object-contain
    w-52 h-52        
    sm:w-62 sm:h-62     
    md:w-[400px] md:h-[400px]
    lg:w-[400px] lg:h-[400px]
    xl:w-[500px] xl:h-[500px]
  "
          />
        </div>

        <div>
          <Step
            n="01"
            title="You send us a request."
            text="Fill out our form or send us a WhatsApp message."
          />
          <Step
            n="02"
            title="We Source & Quote"
            text="We find the exact part and give you a full price."
          />
          <Step
            n="03"
            title="Confirm & Pay"
            text="You approve, make payment, and we handle the rest."
          />
          <Step
            n="04"
            title="Delivered to You"
            text="Door-to-door delivery or pickup in Colombo."
          />
        </div>
      </div>
    </section>
  );
}
