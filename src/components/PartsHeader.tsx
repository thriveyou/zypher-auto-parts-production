export default function PartsShowcaseHeader() {
  return (
    <div className="site-container">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-7 md:flex-row md:items-end md:justify-between md:gap-10 md:pb-8">
        <div className="shrink-0">
          <p className="mb-3 flex items-center gap-2.5 text-xs font-bold tracking-[0.18em] text-zypher-red">
            <span aria-hidden="true" className="h-px w-6 bg-zypher-red" />
            THE SHOWCASE
          </p>
          <h2 id="parts-showcase-heading" className="text-3xl font-bold leading-tight tracking-tight text-slate-950 lg:text-4xl">
            Parts We&apos;ve <span className="text-zypher-red">Delivered</span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-slate-600 md:max-w-sm lg:max-w-md">
          From rare bike accessories to complete car engines, see what we have imported for our customers.
        </p>
      </div>
    </div>
  );
}
