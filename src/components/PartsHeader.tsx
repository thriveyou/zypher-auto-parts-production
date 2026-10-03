export default function PartsShowcaseHeader() {
  return (
    <div className="site-container mt-12 py-4 md:mt-24">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
        <h2 id="parts-showcase-heading" className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
          Parts We&apos;ve Delivered
        </h2>
        <p className="text-slate-600 text-sm md:text-md">
          From rare bike accessories to complete car engines, see what we have imported for our customers.
        </p>
      </div>
    </div>
  );
}
