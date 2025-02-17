'use client';

import { createContext, use } from 'react';

export type AnalyticsSource =
  | 'buy_vertex'
  | 'start_staking'
  | 'nav_bar'
  | 'hero'
  | 'why_vertex';

export type AnalyticsEvent = {
  type: 'new_marketing_cta_clicked';
  data: {
    source: AnalyticsSource;
  };
};

export interface AnalyticsContextData {
  areCookiesAccepted: boolean | null;
  trackEvent(event: AnalyticsEvent): void;
}

export const AnalyticsContext = createContext<AnalyticsContextData>(
  {} as AnalyticsContextData,
);

// Hook to consume context
export const useAnalyticsContext = () => use(AnalyticsContext);
