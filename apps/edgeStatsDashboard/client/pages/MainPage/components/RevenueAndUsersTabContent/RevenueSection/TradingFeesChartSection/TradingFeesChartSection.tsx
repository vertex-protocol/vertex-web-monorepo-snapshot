import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { largeCurrencyNumberAbbreviatedAxisFormatter } from 'client/components/charts/axisFormatters';
import { ChainEnvBreakdownStatsChart } from 'client/components/charts/ChainEnvBreakdownStatsChart/ChainEnvBreakdownStatsChart';
import { StatsChartWithOverviewSection } from 'client/components/StatsChartWithOverviewSection';
import { StatsValueWithLabel } from 'client/components/StatsValueWithLabel';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useTradingFeesByChainEnvChartData } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/TradingFeesChartSection/useTradingFeesByChainEnvChartData';
import { useEdgeTradingFeesOverviewData } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/TradingFeesChartSection/useEdgeTradingFeesOverviewData';

export function TradingFeesChartSection() {
  const { data: edgeTradingFeesOverviewData } =
    useEdgeTradingFeesOverviewData();
  const {
    data: tradingFeesByChainEnvChartData,
    isLoading: isLoadingTradingFeesByChainEnvChartData,
  } = useTradingFeesByChainEnvChartData();
  const { xAxisTickFormatter, granularityLabel } = useChartTimeframe();

  return (
    <StatsChartWithOverviewSection
      overviewContent={
        <>
          <StatsValueWithLabel
            label="24h Fees"
            value={edgeTradingFeesOverviewData?.edgeTotalFees24hUsd}
            formatSpecifier={
              CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED
            }
          />
          <StatsValueWithLabel
            label="Total Fees"
            value={edgeTradingFeesOverviewData?.edgeTotalFeesAllTimeUsd}
            formatSpecifier={
              CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED
            }
          />
        </>
      }
    >
      <ChainEnvBreakdownStatsChart
        chartTitle="Trading Fees per Chain"
        chartDescription={`The ${granularityLabel} trading fees across chains and the cumulative fees on Edge.`}
        data={tradingFeesByChainEnvChartData?.feesUsd}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeCurrencyNumberAbbreviatedAxisFormatter,
        }}
        isLoading={isLoadingTradingFeesByChainEnvChartData}
        chartType="bar"
      />
    </StatsChartWithOverviewSection>
  );
}
