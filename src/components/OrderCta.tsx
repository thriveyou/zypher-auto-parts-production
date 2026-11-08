import { siteConfig } from "@/lib/seo";

export default function OrderCTA() {
  const waText = encodeURIComponent("Hi! I want to get a quotation.");

  return (
    <section className="w-full py-10 sm:py-12">
      <div className="site-container">
        <div
          className="
            w-full rounded-2xl shadow
            px-5 sm:px-8 lg:px-12 xl:px-20
            py-6 sm:py-8 xl:py-8
          "
          style={{ background: "#4B0008" }}
        >
          <div className="grid items-center gap-6 grid-cols-1 text-center md:grid-cols-[1.2fr_auto_0.5fr] md:text-left">
            
            <div className="min-w-0">
              <h2
                className="
                  text-white font-extrabold leading-tight
                  text-xl sm:text-2xl md:text-2xl xl:text-3xl
                "
              >
                Ready to Order Your Part?
              </h2>
              <p
                className="
                  text-white/80 mt-2
                  text-sm sm:text-base md:text-sm xl:text-base
                "
              >
                Click below to send us your request instantly on WhatsApp. Fast, easy, and direct.
              </p>
            </div>


            <div className="justify-self-center md:justify-self-center">
              <a
                href={`${siteConfig.japanWhatsappUrl}?text=${waText}`}
                className="
                  inline-flex items-center justify-center rounded-lg bg-white
                  px-5 py-2.5 text-sm
                  md:px-6 md:py-3 md:text-sm
                  xl:px-10 xl:py-4 xl:text-lg
                  font-semibold text-slate-600 hover:bg-white/95 transition
                  whitespace-nowrap
                "
              >
                Get a Quotation
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <div className="mx-auto flex w-fit flex-col gap-3 text-left md:ml-auto md:mr-0">
                <a
                  href={`${siteConfig.sriLankaWhatsappUrl}?text=${waText}`}
                  className="flex items-center gap-3 rounded-lg text-white transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span aria-hidden="true" className="text-2xl leading-none">🇱🇰</span>
                  <span>
                    <span className="block text-xs font-medium leading-4 text-white/70">Sri Lanka</span>
                    <span className="block whitespace-nowrap text-lg font-bold leading-snug tabular-nums xl:text-xl">
                      {siteConfig.phoneDisplay}
                    </span>
                  </span>
                </a>
                <a
                  href={`${siteConfig.japanWhatsappUrl}?text=${waText}`}
                  className="flex items-center gap-3 rounded-lg text-white transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span aria-hidden="true" className="text-2xl leading-none">🇯🇵</span>
                  <span>
                    <span className="block text-xs font-medium leading-4 text-white/70">Japan</span>
                    <span className="block whitespace-nowrap text-lg font-bold leading-snug tabular-nums xl:text-xl">
                      {siteConfig.japanPhoneDisplay}
                    </span>
                  </span>
                </a>
              </div>
              <div
                className="
                  text-white/80 mt-3
                  text-xs md:text-xs xl:text-sm
                "
              >
                You can contact us 24/7.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
