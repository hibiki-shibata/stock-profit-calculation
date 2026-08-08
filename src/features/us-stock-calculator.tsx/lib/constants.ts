// Rakuten Securities US-stock commission tier.
// 0.495% of trade value in USD, capped at $22 once trade value crosses the threshold.
// Verify against Rakuten's current published rates before relying on this in production —
// brokers change fee schedules without much notice.
export const COMMISSION_RATE = 0.00495;
export const COMMISSION_CAP_USD = 22;
export const COMMISSION_CAP_THRESHOLD_USD = COMMISSION_CAP_USD / COMMISSION_RATE; // ≈ 4444.44