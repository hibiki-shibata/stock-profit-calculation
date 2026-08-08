export interface CalculationInput {
  stockPriceAtBuy: number;
  stockPriceAtSell: number;
  jpyPerUsdAtBuy: number;
  jpyPerUsdAtSell: number;
  totalInvestJpy: number;
}

export interface CalculationResult {
  totalInvestUsd: number;
  commissionUsd: number;
  growthRate: number;
  profitPerStockUsd: number;
  netProfitUsd: number;
  netProfitJpy: number;
  isSuccess: boolean;
}