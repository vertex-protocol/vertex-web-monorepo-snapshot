import { largeCurrencyNumberAbbreviatedAxisFormatter } from 'client/components/charts/axisFormatters';
import { StatsChart } from 'client/components/charts/StatsChart/StatsChart';
import { StatsSection } from 'client/components/StatsSection';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useEdgeSpotPerpVolumeChartsSectionData } from 'client/pages/MainPage/components/VolumesTabContent/EdgeSpotPerpVolumeChartsSection/useEdgeSpotPerpVolumeChartsSectionData';
import { getEdgeStatsColorVar } from 'client/theme/colorVars';
import { startCase } from 'lodash';

export function EdgeSpotPerpVolumeChartsSection() {
  const { xAxisTickFormatter, granularityLabel } = useChartTimeframe();
  const { data, isLoading } = useEdgeSpotPerpVolumeChartsSectionData();

  const granularityLabelStartCased = startCase(granularityLabel);

  return (
    <StatsSection className="sm:grid-cols-2">
      <StatsChart
        chartTitle={`${granularityLabelStartCased} Perps & Spot Volume`}
        chartDescription={`The ${granularityLabel} Edge perp and spot trading volume.`}
        data={data?.perpSpotVolumesUsd}
        configByDataKey={{
          perpVolumeUsd: {
            dataKey: 'perpVolumeUsd',
            label: `${granularityLabelStartCased} Perp Vol.`,
            chartType: 'bar',
            yAxisId: 'left',
          },
          spotVolumeUsd: {
            dataKey: 'spotVolumeUsd',
            label: `${granularityLabelStartCased} Spot Vol.`,
            chartType: 'bar',
            yAxisId: 'left',
          },
        }}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeCurrencyNumberAbbreviatedAxisFormatter,
        }}
        isLoading={isLoading}
      />
      <StatsChart
        chartTitle="Cumulative Perps & Spot Volume"
        chartDescription="The cumulative trading volume of Edge perpetual and spot markets over time."
        data={data?.cumulativePerpSpotVolumesUsd}
        configByDataKey={{
          perpVolumeUsd: {
            dataKey: 'perpVolumeUsd',
            label: 'Cum. Perp Vol.',
            chartType: 'area',
            yAxisId: 'left',
          },
          spotVolumeUsd: {
            dataKey: 'spotVolumeUsd',
            label: 'Cum. Spot Vol.',
            chartType: 'area',
            yAxisId: 'left',
          },
          totalVolumeUsd: {
            color: getEdgeStatsColorVar('chart-fill'),
            dataKey: 'totalVolumeUsd',
            label: 'Cum. Total Vol.',
            hasTooltipTopDivider: true,
            chartType: 'line',
            yAxisId: 'left',
          },
        }}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeCurrencyNumberAbbreviatedAxisFormatter,
        }}
        isLoading={isLoading}
      />
    </StatsSection>
  );
}
