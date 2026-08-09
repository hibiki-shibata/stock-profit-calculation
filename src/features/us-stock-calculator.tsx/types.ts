export interface CalculationInput {
  stockPriceAtBuy: number;
  stockPriceAtSell: number;
  jpyPerUsdAtBuy: number;
  jpyPerUsdAtSell: number;
  totalInvestJpy: number;
}

export interface CalculationResult {
  totalInvestUsd: number;
  growthRate: number;
  commissionJpy: number;
  taxAmountJpy: number;
  netProfitUsd: number;
  netProfitJpy: number;
  isSuccess: boolean;
}