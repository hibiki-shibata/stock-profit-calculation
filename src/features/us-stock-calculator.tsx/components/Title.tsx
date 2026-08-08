export function Title() {
  return (
    <header className="mx-auto px-4 pt-16 pb-4 text-center">
      <span className="inline-block rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-emerald-400">
        JPY → US Stocks
      </span>

      <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-100 sm:text-5xl md:text-6xl">
        US Stock{" "}
        <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
          Expected Return
        </span>{" "}
        Calculator
      </h1>

      <p className="mt-4 text-sm text-slate-400 sm:text-base">
        Estimate net profit in JPY after currency conversion and Rakuten Securities commission.
      </p>
    </header>
  )
}