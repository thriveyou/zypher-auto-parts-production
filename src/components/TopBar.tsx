export default function TopBar() {
  return (
    <div className="text-slate-600">
      <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-28 px-4 md:px-6 lg:px-8 xl:px-12 py-2.5 md:py-3 lg:py-4">
        <div className="flex items-center justify-between lg:hidden text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#FFE8E8] text-[#ff3b30] px-2 py-0.5 font-semibold whitespace-nowrap">
              Hotline 24/7
            </span>
            <a
              href="tel:+94767115861"
              className="underline-offset-2 hover:underline whitespace-nowrap"
            >
               (076) 711 5861
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="mailto:support@yourdomain.com"
              aria-label="Email support"
              className="p-1 rounded hover:bg-slate-100 transition"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" />
                <path d="M3 6l7 5 7-5" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </a>

            <button className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 transition whitespace-nowrap">
              <span>All</span>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M5 7l5 6 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-between text-base">
          <div className="flex items-center gap-8">
            <span className="rounded-full bg-[#FFE8E8] text-[#ff3b30] px-3 py-1 font-semibold">
              Hotline 24/7
            </span>
            <span>(076) 711 5861</span>
            <span>Email: support@yourdomain.com</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-slate-500">Categories:</span>
            <button className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-100 transition">
              <span>All</span>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M5 7l5 6 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
