import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { largeCurrencyNumberAbbreviatedAxisFormatter } from 'client/components/charts/axisFormatters';
import { ChainEnvBreakdownStatsChart } from 'client/components/charts/ChainEnvBreakdownStatsChart/ChainEnvBreakdownStatsChart';
import { StatsChartWithOverviewSection } from 'client/components/StatsChartWithOverviewSection';
import { StatsSection } from 'client/components/StatsSection';
import { StatsValueWithLabel } from 'client/components/StatsValueWithLabel';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { StatsPieChart } from 'client/components/charts/StatsPieChart/StatsPieChart';
import { StatsPieChartCenterMetric } from 'client/components/charts/StatsPieChart/StatsPieChartCenterMetric';
import { useInsuranceFundsByChainEnvPieChartData } from 'client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/LiquidationsSection/useInsuranceFundsByChainEnvPieChartData';
import { useEdgeLiquidationsOverviewData } from 'client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/LiquidationsSection/useEdgeLiquidationsOverviewData';
import { useLiquidationsByChainEnvChartData } from 'client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/LiquidationsSection/useLiquidationsByChainEnvChartData';

export function LiquidationsSection() {
  const {
    data: insuranceFundsByChainEnvPieChartData,
    isLoading: isLoadingInsuranceFundsByChainEnvPieChartData,
  } = useInsuranceFundsByChainEnvPieChartData();
  const { data: edgeLiquidationsOverviewData } =
    useEdgeLiquidationsOverviewData();

  const {
    data: liquidationsByChainEnvChartData,
    isLoading: isLoadingLiquidationsByChainEnvChartData,
  } = useLiquidationsByChainEnvChartData();
  const { granularityLabel, xAxisTickFormatter } = useChartTimeframe();

  const formatSpecifier =
    CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED;

  return (
    <StatsSection className="items-end lg:grid-cols-4">
      <StatsChartWithOverviewSection
        className="lg:col-span-3"
        overviewContent={
          <>
            <StatsValueWithLabel
              label="24h Liquidations"
              value={edgeLiquidationsOverviewData?.edgeLiquidations24hUsd}
              formatSpecifier={formatSpecifier}
            />
            <StatsValueWithLabel
              label="Total Liquidations"
              value={edgeLiquidationsOverviewData?.edgeLiquidationsAllTimeUsd}
              formatSpecifier={formatSpecifier}
            />
          </>
        }
      >
        <ChainEnvBreakdownStatsChart
          chartTitle="Liquidations per Chain"
          chartDescription={`The ${granularityLabel} liquidations across chains on Edge.`}
          data={liquidationsByChainEnvChartData?.liquidations}
          xAxisProps={{
            tickFormatter: xAxisTickFormatter,
          }}
          yAxisProps={{
            tickFormatter: largeCurrencyNumberAbbreviatedAxisFormatter,
          }}
          isLoading={isLoadingLiquidationsByChainEnvChartData}
          chartType="bar"
        />
      </StatsChartWithOverviewSection>
      <StatsSection className="lg:col-span-1">
        <StatsPieChart
          chartTitle="Insurance Funds"
          chartDescription="Breakdown of the insurance funds on Edge."
          centerContent={
            <StatsPieChartCenterMetric
              label="Total"
              value={
                insuranceFundsByChainEnvPieChartData?.edgeTotalInsuranceFundsUsd
              }
              valueFormatSpecifier={formatSpecifier}
            />
          }
          isLoading={isLoadingInsuranceFundsByChainEnvPieChartData}
          data={
            insuranceFundsByChainEnvPieChartData?.insuranceFundsByChainEnvUsd
          }
          formatSpecifier={formatSpecifier}
        />
      </StatsSection>
    </StatsSection>
  );
}
