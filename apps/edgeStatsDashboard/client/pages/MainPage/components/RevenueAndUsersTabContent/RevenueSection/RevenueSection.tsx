import { StatsSection } from 'client/components/StatsSection';
import { EdgeNetTradingFeesChartSection } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/EdgeNetTradingFeesChartSection/EdgeNetTradingFeesChartSection';
import { TradingFeesByMarketChartSection } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/TradingFeesByMarketChartSection/TradingFeesByMarketChartSection';
import { TradingFeesChartSection } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/TradingFeesChartSection/TradingFeesChartSection';

export function RevenueSection() {
  return (
    <>
      <StatsSection className="sm:grid-cols-2">
        <TradingFeesChartSection />
        <TradingFeesByMarketChartSection />
      </StatsSection>
      <EdgeNetTradingFeesChartSection />
    </>
  );
}
