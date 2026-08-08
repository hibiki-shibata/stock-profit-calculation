export function formatNumber(num: number, maximumFractionDigits = 2): string {
  return num.toLocaleString("en-US", { maximumFractionDigits });
}

// Multiplies before formatting — formatting a raw rate then multiplying
// the resulting string is a common bug (turns 0.267 into "0.27" * 100).
export function formatPercent(rate: number): string {
  return `${formatNumber(rate * 100)}%`;
}