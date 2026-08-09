import { COMMISSION_CAP_THRESHOLD_USD, COMMISSION_CAP_USD, COMMISSION_RATE, JPN_CAPITAL_GAIN_TAX_RATE } from "./constants";
import type { CalculationInput, CalculationResult } from '../types'

function calcComissionUsd(tradeAmountUsd: number): number {
  return tradeAmountUsd < COMMISSION_CAP_THRESHOLD_USD
    ? tradeAmountUsd * COMMISSION_RATE
    : COMMISSION_CAP_USD;
}

function calcTax(taxableAmount: number): number {
  return (taxableAmount > 0) ? taxableAmount * JPN_CAPITAL_GAIN_TAX_RATE : 0
}

export function calculate({
  stockPriceAtBuy,
  stockPriceAtSell,
  jpyPerUsdAtBuy,
  jpyPerUsdAtSell,
  totalInvestJpy,
}: CalculationInput): CalculationResult {
  const totalInvestUsd: number = totalInvestJpy / jpyPerUsdAtBuy;

  const growthRate: number = (stockPriceAtSell - stockPriceAtBuy) / stockPriceAtBuy

  const realizedProfitUsd: number = totalInvestUsd * growthRate

  const sellAmountJpy = (totalInvestUsd + realizedProfitUsd) * jpyPerUsdAtSell

  // Comissions
  const commissionAtBuyJpy: number = calcComissionUsd(totalInvestUsd) * jpyPerUsdAtBuy
  const commissionAtSellJpy: number = calcComissionUsd(totalInvestUsd + realizedProfitUsd) * jpyPerUsdAtSell
  const commissionJpy: number = Math.round(commissionAtBuyJpy + commissionAtSellJpy)

  const taxableProfitJpy = sellAmountJpy - totalInvestJpy - commissionJpy

  const taxAmountJpy: number = calcTax(taxableProfitJpy)

  const netProfitJpy = taxableProfitJpy - taxAmountJpy
  const netProfitUsd = netProfitJpy / jpyPerUsdAtSell
  return {
    totalInvestUsd,
    commissionJpy,
    growthRate,
    taxAmountJpy,
    netProfitUsd,
    netProfitJpy,
    isSuccess: netProfitJpy > 0,
  };
}