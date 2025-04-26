export const FUNDING_RATE_PERIODS = ['1h', '8h', '1d', '1y'] as const;

export type FundingRatePeriod = (typeof FUNDING_RATE_PERIODS)[number];
