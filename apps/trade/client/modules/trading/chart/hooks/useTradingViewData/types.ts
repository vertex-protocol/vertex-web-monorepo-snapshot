import type { Bar } from 'public/charting_library';

export interface BarSubscriber {
  refreshInterval: ReturnType<typeof setInterval>;
  chartIntervalSeconds: number;
  updateLatestBar(bar: Bar, callContext: string): void;
  productId: number;
}
