import {
  PresetNumberFormatSpecifier,
  signDependentValue,
} from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { percentagePreciseAxisFormatter } from 'client/components/charts/axisFormatters';
import { StatsChart } from 'client/components/charts/StatsChart/StatsChart';
import { MarketWithRateList } from 'client/components/MarketWithRateList';
import { StatsSection } from 'client/components/StatsSection';
import { LINKS } from 'client/config/links';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { ProductsSelect } from 'client/pages/MainPage/components/common/ProductsSelect/ProductsSelect';
import { useProductsSelect } from 'client/pages/MainPage/components/common/ProductsSelect/useProductsSelect';
import { useEdgeTopFundingRatesCardData } from 'client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/FundingSection/useEdgeTopFundingRatesCardData';
import { useHistoricalFundingChartData } from 'client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/FundingSection/useHistoricalFundingChartData';
import { useAllEdgePerpMarkets } from 'client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/hooks/useAllEdgePerpMarkets';
import { getEdgeStatsColorVar } from 'client/theme/colorVars';
import Link from 'next/link';

export function FundingSection() {
  const { data: allEdgePerpMarketsData } = useAllEdgePerpMarkets();

  const {
    selectOptions,
    open: selectOpen,
    onValueChange: onSelectValueChange,
    value: selectValue,
    onOpenChange: onSelectOpenChange,
    selectedOption,
  } = useProductsSelect({
    markets: allEdgePerpMarketsData,
  });
  const { xAxisTickFormatter } = useChartTimeframe();
  const { data: fundingChartData, isLoading: isLoadingFundingChartData } =
    useHistoricalFundingChartData({ selectedProduct: selectedOption?.value });

  const {
    data: edgeTopFundingRatesCardData,
    isLoading: isLoadingEdgeTopFundingRatesCardData,
  } = useEdgeTopFundingRatesCardData();

  return (
    <StatsSection className="sm:grid-cols-2">
      <MarketWithRateList.Card
        title="Top Predicted Rates"
        description="The top predicted annualized funding rates."
        isLoading={isLoadingEdgeTopFundingRatesCardData}
        data={edgeTopFundingRatesCardData?.topFundingRates}
        renderListItem={({ asset, rate }) => (
          <MarketWithRateList.Item
            key={asset}
            asset={asset}
            rate={rate}
            formatSpecifier={PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_4DP}
            rateClassName={signDependentValue(rate, {
              positive: 'text-positive',
              negative: 'text-negative',
              zero: 'text-primary',
            })}
          />
        )}
        footerAction={
          <LinkButton
            as={Link}
            href={LINKS.vertexAppMarkets}
            colorVariant="primary"
            className="text-xs"
            external
            withExternalIcon
          >
            See all Funding Rates
          </LinkButton>
        }
      />
      <StatsChart
        chartTitle="Historical Funding Rates"
        chartDescription="The historical annualized funding rates for the selected market."
        headerEndElement={
          <ProductsSelect
            selectOptions={selectOptions}
            open={selectOpen}
            onValueChange={onSelectValueChange}
            value={selectValue}
            onOpenChange={onSelectOpenChange}
            selectedProduct={selectedOption?.value}
          />
        }
        data={fundingChartData?.fundingRates}
        configByDataKey={{
          fundingRate: {
            color: getEdgeStatsColorVar('chart-fill'),
            dataKey: 'fundingRate',
            label: 'Funding Rate',
            chartType: 'line',
            yAxisId: 'left',
          },
        }}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: percentagePreciseAxisFormatter,
        }}
        isLoading={isLoadingFundingChartData}
      />
    </StatsSection>
  );
}
