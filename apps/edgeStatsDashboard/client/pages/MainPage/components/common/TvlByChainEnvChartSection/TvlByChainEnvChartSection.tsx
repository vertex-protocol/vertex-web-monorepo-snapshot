import {
  CustomNumberFormatSpecifier,
  formatNumber,
  NumberFormatValue,
} from '@vertex-protocol/react-client';
import { Pill } from '@vertex-protocol/web-ui';
import { largeCurrencyNumberAbbreviatedAxisFormatter } from 'client/components/charts/axisFormatters';
import { ChainEnvBreakdownStatsChart } from 'client/components/charts/ChainEnvBreakdownStatsChart/ChainEnvBreakdownStatsChart';
import { StatsChartWithOverviewSection } from 'client/components/StatsChartWithOverviewSection';
import { StatsValueWithLabel } from 'client/components/StatsValueWithLabel';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useTvlByChainEnvChartData } from 'client/pages/MainPage/components/common/TvlByChainEnvChartSection/useTvlByChainEnvChartData';
import { useTvlOverviewData } from 'client/pages/MainPage/components/common/TvlByChainEnvChartSection/useTvlOverviewData';

export function TvlByChainEnvChartSection() {
  const { data: tvlOverviewData } = useTvlOverviewData();
  const {
    data: tvlByChainEnvChartData,
    isLoading: isLoadingTvlByChainEnvChartData,
  } = useTvlByChainEnvChartData();

  const { xAxisTickFormatter } = useChartTimeframe();

  const formatSpecifier =
    CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED;

  return (
    <StatsChartWithOverviewSection
      overviewContent={
        <>
          <StatsValueWithLabel
            label="TVL"
            value={tvlOverviewData?.edgeTvlAtNowUsd}
            formatSpecifier={formatSpecifier}
          />
          <StatsValueWithLabel
            label="24h Flows"
            valueContent={
              <FlowsValueContent
                depositsValueUsd={tvlOverviewData?.edgeDeposits24hUsd}
                withdrawalsValueUsd={tvlOverviewData?.edgeWithdrawals24hUsd}
                formatSpecifier={formatSpecifier}
              />
            }
          />
        </>
      }
    >
      <ChainEnvBreakdownStatsChart
        chartTitle="TVL per Chain"
        chartDescription="The TVL across chains on Edge."
        data={tvlByChainEnvChartData?.tvlUsd}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeCurrencyNumberAbbreviatedAxisFormatter,
        }}
        isLoading={isLoadingTvlByChainEnvChartData}
        chartType="area"
        hideEdgeCumulativeYAxis
      />
    </StatsChartWithOverviewSection>
  );
}

function FlowsValueContent({
  depositsValueUsd,
  withdrawalsValueUsd,
  formatSpecifier,
}: {
  depositsValueUsd: NumberFormatValue | undefined;
  withdrawalsValueUsd: NumberFormatValue | undefined;
  formatSpecifier: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex gap-x-1">
        {formatNumber(depositsValueUsd, {
          formatSpecifier,
        })}
        <Pill
          className="font-normal"
          colorVariant="positive"
          borderRadiusVariant="sm"
          sizeVariant="xs"
        >
          Deposited
        </Pill>
      </div>
      <span className="text-stroke">/</span>
      <div className="flex gap-x-1">
        {formatNumber(withdrawalsValueUsd, {
          formatSpecifier,
        })}
        <Pill
          className="font-normal"
          colorVariant="negative"
          borderRadiusVariant="sm"
          sizeVariant="xs"
        >
          Withdrawn
        </Pill>
      </div>
    </div>
  );
}
