import { useMemo, useRef, useState } from "react";
import { calculate } from "./lib/calculate";
import { COMMISSION_CAP_THRESHOLD_USD, COMMISSION_CAP_USD, COMMISSION_RATE } from "./lib/constants";
import { formatNumber, formatPercent } from "./lib/format";
import { Field } from "./components/Field";
import { ResultRow } from "./components/ResultRow";

export default function StockProfitCalculator() {
  const [stockPriceAtBuy, setStockPriceAtBuy] = useState(10);
  const [stockPriceAtSell, setStockPriceAtSell] = useState(12);
  const [jpyPerUsdAtBuy, setJpyPerUsdAtBuy] = useState(150);
  const [jpyPerUsdAtSell, setJpyPerUsdAtSell] = useState(150);
  const [totalInvestJpy, setTotalInvestJpy] = useState(10000);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const focusNext = (index: number) => {
    const next = inputRefs.current[index + 1];
    if (next) {
      next.focus();
      next.select();
    } else {
      inputRefs.current[index]?.blur();
    }
  }

  const result = useMemo(
    () =>
      calculate({
        stockPriceAtBuy,
        stockPriceAtSell,
        jpyPerUsdAtBuy,
        jpyPerUsdAtSell,
        totalInvestJpy,
      }),
    [stockPriceAtBuy, stockPriceAtSell, jpyPerUsdAtBuy, jpyPerUsdAtSell, totalInvestJpy]
  );

  return (
    <div className="px-4 py-10">
      <div className="mx-auto grid w-full max-w-3xl gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Inputs
          </h2>
          <div className="grid gap-4">
            <Field
              ref={(el) => { inputRefs.current[0] = el; }}
              label="Stock price at buy"
              suffix="USD"
              value={stockPriceAtBuy}
              onChange={setStockPriceAtBuy}
              step={1}
              onEnter={() => focusNext(0)}
            />
            <Field
              ref={(el) => { inputRefs.current[1] = el; }}
              label="Stock price at sell"
              suffix="USD"
              value={stockPriceAtSell}
              onChange={setStockPriceAtSell}
              step={1}
              onEnter={() => focusNext(1)}
            />
            <Field
              ref={(el) => { inputRefs.current[2] = el; }}
              label="JPY/USD at buy"
              suffix="JPY"
              value={jpyPerUsdAtBuy}
              onChange={setJpyPerUsdAtBuy}
              step={1}
              onEnter={() => focusNext(2)}
            />
            <Field
              ref={(el) => { inputRefs.current[3] = el; }}
              label="JPY/USD at sell"
              suffix="JPY"
              value={jpyPerUsdAtSell}
              onChange={setJpyPerUsdAtSell}
              step={1}
              onEnter={() => focusNext(3)}
            />
            <Field
              ref={(el) => { inputRefs.current[4] = el; }}
              label="Total invested"
              suffix="JPY"
              value={totalInvestJpy}
              onChange={setTotalInvestJpy}
              step={stockPriceAtBuy * jpyPerUsdAtBuy}
              onEnter={() => focusNext(4)}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Result
            </h2>
            <span className="text-2xl">{result.isSuccess ? "✅" : "❌"}</span>
          </div>

          <div className="divide-y divide-slate-800">
            <ResultRow
              label="Growth rate"
              value={formatPercent(result.growthRate)}
              positive={result.growthRate > 0}
              negative={result.growthRate < 0}
            />
            <ResultRow
              label="Commission"
              value={`${formatNumber(result.commissionJpy)} JPY`}
            />
            <ResultRow
              label="Tax"
              value={`${formatNumber(result.taxAmountJpy)} JPY`}
            />
            <ResultRow
              label="Total invested"
              value={`${formatNumber(result.totalInvestUsd)} USD / ${formatNumber(
                totalInvestJpy,
                0
              )} JPY`}
            />
            <ResultRow
              label="Net profit (USD)"
              value={`${formatNumber(result.netProfitUsd)} USD`}
              emphasis
              positive={result.netProfitUsd > 0}
              negative={result.netProfitUsd < 0}
            />
            <ResultRow
              label="Net profit (JPY)"
              value={`${formatNumber(result.netProfitJpy, 0)} JPY`}
              emphasis
              positive={result.netProfitJpy > 0}
              negative={result.netProfitJpy < 0}
            />
            <div className="relative group mt-3">
              <span className="absolute group-hover:hidden right-0 text-slate-400 font-bold">
                ⓘ
              </span>
              <div className="hidden group-hover:block w-80 rounded-lg p-3 border border-slate-800 text-xs text-slate-400">
                <p>
                  1. Commission: {(COMMISSION_RATE * 100).toFixed(3)}% of trade value, capped
                  at ${COMMISSION_CAP_USD} above ~${formatNumber(COMMISSION_CAP_THRESHOLD_USD)}.
                </p>
                <p className="mt-1">
                  2. Tax: 20.315% of realized profits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}