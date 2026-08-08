import { COMMISSION_CAP_THRESHOLD_USD, COMMISSION_CAP_USD, COMMISSION_RATE } from "./constants";
import type { CalculationInput, CalculationResult } from '../types'

export function calculate({
  stockPriceAtBuy,
  stockPriceAtSell,
  jpyPerUsdAtBuy,
  jpyPerUsdAtSell,
  totalInvestJpy,
}: CalculationInput): CalculationResult {
  const totalInvestUsd = totalInvestJpy / jpyPerUsdAtBuy;

  const commissionUsd =
    totalInvestUsd < COMMISSION_CAP_THRESHOLD_USD
      ? totalInvestUsd * COMMISSION_RATE
      : COMMISSION_CAP_USD;

  const growthRate = (stockPriceAtSell - stockPriceAtBuy) / stockPriceAtBuy;
  const profitPerStockUsd = stockPriceAtBuy * growthRate;
  const netProfitUsd = totalInvestUsd * growthRate - commissionUsd;
  const netProfitJpy = netProfitUsd * jpyPerUsdAtSell;

  return {
    totalInvestUsd,
    commissionUsd,
    growthRate,
    profitPerStockUsd,
    netProfitUsd,
    netProfitJpy,
    isSuccess: netProfitJpy > 0,
  };
}

/* Example test (Vitest/Jest), kept here as a comment for reference — move into
   calculate.test.ts in a real project:

import { describe, expect, it } from "vitest";
import { calculate } from "./calculate";

describe("calculate", () => {
  it("matches the known reference case", () => {
    const result = calculate({
      stockPriceAtBuy: 355,
      stockPriceAtSell: 450,
      jpyPerUsdAtBuy: 158,
      jpyPerUsdAtSell: 168,
      totalInvestJpy: 4_200_000,
    });
    expect(result.isSuccess).toBe(true);
    expect(result.commissionUsd).toBeCloseTo(22, 5); // above the cap threshold
  });
});
*/