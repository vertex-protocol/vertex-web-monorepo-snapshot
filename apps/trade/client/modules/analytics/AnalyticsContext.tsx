import { AnalyticsEvent } from 'client/modules/analytics/types';
import { createContext, useContext } from 'react';

export interface AnalyticsContextData {
  areCookiesAccepted: boolean | null;

  updateUserAddress(address: string): Promise<void>;

  trackEvent(event: AnalyticsEvent): void;
}

export const AnalyticsContext = createContext<AnalyticsContextData>(
  {} as AnalyticsContextData,
);

// Hook to consume context
export const useAnalyticsContext = () => useContext(AnalyticsContext);
