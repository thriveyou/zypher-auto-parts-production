const partsPortalUrl = "https://parts.zypherimports.lk/";
const partsRequestUrl = "https://parts.zypherimports.lk/request-form";

const steps = [
  {
    title: "Submit Request",
    text: "Open the platform and add your vehicle details, part request, and photos.",
    icon: MessageIcon,
  },
  {
    title: "AI Quick Scan",
    text: "Use the online AI scan to help identify the part from your image.",
    icon: SparkIcon,
  },
  {
    title: "Get Quote",
    text: "Receive pricing from stock, local sourcing, or Japan import.",
    icon: SearchIcon,
  },
  {
    title: "Receive Your Part",
    text: "Confirm the quote and receive genuine verified parts.",
    icon: CheckIcon,
  },
];

export default function PartsRequestSection() {
  return (
    <section className="site-container py-8 md:py-16" aria-labelledby="parts-request-heading">
      <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:gap-10 md:p-8 lg:grid-cols-[1fr_0.95fr] lg:p-10">
        <div className="flex flex-col justify-center">
          <h2
            id="parts-request-heading"
            className="max-w-3xl text-2xl font-extrabold leading-tight text-slate-950 md:text-5xl"
          >
            Visit Our AI Parts Platform -{" "}
            <span className="text-[#C60C3E]">
              Request Vehicle Parts Online
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:mt-5 md:text-lg md:leading-7">
            Use our dedicated parts request platform to submit the part you need,
            upload photos, try AI-powered part detection, and get a quotation
            from the Zypher Imports team.
          </p>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row md:mt-8 md:gap-3">
            <a
              href={partsPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C60C3E] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#C60C3E]/20 transition hover:bg-[#a90832] md:px-6 md:py-3 md:text-base"
            >
              Visit Parts Platform
              <ArrowIcon className="h-4 w-4" />
            </a>
            <a
              href={partsRequestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-700/20 transition hover:bg-green-800 md:px-6 md:py-3 md:text-base"
            >
              <SparkIcon className="h-4 w-4" />
              Request a Part Online
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 md:p-6">
          <div className="divide-y divide-slate-200">
            {steps.map(({ title, text, icon: Icon }) => (
              <div key={title} className="flex gap-3 py-3 first:pt-0 last:pb-0 md:gap-4 md:py-5 md:first:pt-2">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C60C3E] text-white md:h-11 md:w-11 md:rounded-xl">
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-950 md:text-lg">
                    {title}
                  </h3>
                  <p className="mt-0.5 text-xs leading-5 text-slate-600 md:mt-1 md:text-sm md:leading-6">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.7 4.6L18 9.3l-4.3 1.7L12 16l-1.7-5L6 9.3l4.3-1.7z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
      <path d="M5 14l.6 1.4L7 16l-1.4.6L5 18l-.6-1.4L3 16l1.4-.6z" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l2.5 2.5L16 9" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
