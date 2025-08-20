"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { saira } from "@/app/layout";
import heroParts from "@/assets/hero-parts.png";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={heroRef} className="mt-10">
      <div className="mx-4 md:mx-16 xl:mx-28 px-4 md:px-6 xl:px-12">
        <div
          className="
            grid items-center gap-8
            grid-cols-1
            md:grid-cols-2
            xl:[grid-template-columns:1.3fr_0.7fr]
          "
        >
          <div className="relative pt-14 md:pt-16">
            <HeroAutoBanner targetRef={heroRef} />

            <h1
              className="mt-8 md:mt-10 xl:mt-12 font-semibold tracking-wide text-slate-900 leading-[1.2]
                         text-4xl md:text-5xl xl:text-7xl"
            >
              Order{" "}
              <span className={`${saira.className} text-[#9A0111]`}>Genuine</span>{" "}
              Vehicle
              <br />
              Parts Directly from
              <br />
              <span className="inline-flex items-center gap-5 md:gap-8">
                <span className="inline-block h-5 w-5 md:h-6 md:w-6 xl:h-8 xl:w-8 rounded-full ring-10 ring-[#eee0e0] bg-[#B41515]" />
                <span className={`${saira.className} text-[#9A0111]`}>Japan.</span>
              </span>
            </h1>

            <p className="mt-4 max-w-md md:max-w-xl xl:max-w-xl 
                           text-base md:text-lg xl:text-xl text-slate-600">
              Car &amp; bike parts sourced in Japan and shipped straight to your doorstep in Sri Lanka — 
              fast, safe, and affordable
            </p>

            <div className="mt-6">
              <a
                href="https://wa.me/94767115861?text=Hi!%20I%20want%20to%20order%20a%20vehicle%20part."
                className="inline-flex items-center gap-2 md:gap-3 rounded-lg
                           px-4 py-2 md:px-8 md:py-4
                           text-sm md:text-lg xl:text-xl
                           text-white shadow hover:opacity-95
                           bg-gradient-to-r from-[#1ABA1A] to-[#00A975] whitespace-nowrap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="18"
                  height="18"
                  className="shrink-0 md:w-[22px] md:h-[22px]"
                  aria-hidden="true"
                >
                  <path
                    fill="#EDEDED"
                    d="M0,512l35.31-128C12.359,344.276,0,300.138,0,254.234C0,114.759,114.759,0,255.117,0
                    S512,114.759,512,254.234S395.476,512,255.117,512c-44.138,0-86.51-14.124-124.469-35.31L0,512z"
                  />
                  <path
                    fill="#25D366"
                    d="M137.71,430.786l7.945,4.414c32.662,20.303,70.621,32.662,110.345,32.662
                    c115.641,0,211.862-96.221,211.862-213.628S371.641,44.138,255.117,44.138S44.138,137.71,44.138,254.234
                    c0,40.607,11.476,80.331,32.662,113.876l5.297,7.945l-20.303,74.152L137.71,430.786z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M187.145,135.945l-16.772-0.883c-5.297,0-10.593,1.766-14.124,5.297
                    c-7.945,7.062-21.186,20.303-24.717,37.959c-6.179,26.483,3.531,58.262,26.483,90.041s67.09,82.979,144.772,105.048
                    c24.717,7.062,44.138,2.648,60.028-7.062c12.359-7.945,20.303-20.303,22.952-33.545l2.648-12.359
                    c0.883-3.531-0.883-7.945-4.414-9.71l-55.614-25.6c-3.531-1.766-7.945-0.883-10.593,2.648l-22.069,28.248
                    c-1.766,1.766-4.414,2.648-7.062,1.766c-15.007-5.297-65.324-26.483-92.69-79.448c-0.883-2.648-0.883-5.297,0.883-7.062
                    l21.186-23.834c1.766-2.648,2.648-6.179,1.766-8.828l-25.6-57.379C193.324,138.593,190.676,135.945,187.145,135.945"
                  />
                </svg>
                ORDER NOW
              </a>
            </div>
          </div>

          <div className="relative mt-8 md:mt-0 flex justify-center">
            <Image
              src={heroParts}
              alt="Auto parts box"
              width={600}
              height={600}
              priority
              className="h-auto w-[260px] sm:w-[320px] md:w-[380px] xl:w-[600px]"
              sizes="(min-width:1280px) 600px, (min-width:768px) 45vw, 90vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroAutoBanner({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          timeoutRef.current = setTimeout(() => setVisible(true), 500);
        } else {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setVisible(false);
        }
      },
      { root: null, threshold: [0, 0.25, 0.4, 0.6, 0.8, 1] }
    );

    observer.observe(el);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      observer.disconnect();
    };
  }, [targetRef]);

  return (
    <div className="absolute top-0 left-0 z-30">
      <div
        className={[
          "inline-flex items-center rounded-full border border-slate-200 bg-white",
          "px-4 py-2 text-sm md:text-sm xl:text-base font-medium text-slate-700 shadow-lg",
          "transition-all duration-1000 ease-out",
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none",
        ].join(" ")}
        aria-hidden={!visible}
      >
        DIRECT IMPORT – GENUINE ONLY
      </div>
    </div>
  );
}
