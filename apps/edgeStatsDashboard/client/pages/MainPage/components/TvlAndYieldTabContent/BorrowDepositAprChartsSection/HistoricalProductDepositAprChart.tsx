import { percentagePreciseAxisFormatter } from 'client/components/charts/axisFormatters';
import { StatsChart } from 'client/components/charts/StatsChart/StatsChart';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { ProductsSelect } from 'client/pages/MainPage/components/common/ProductsSelect/ProductsSelect';
import { useProductsSelect } from 'client/pages/MainPage/components/common/ProductsSelect/useProductsSelect';
import { useHistoricalProductDepositAprChartData } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprChartsSection/useHistoricalProductDepositAprChartData';
import { useAllEdgeSpotProducts } from 'client/pages/MainPage/components/TvlAndYieldTabContent/hooks/useAllEdgeSpotProducts';
import { getEdgeStatsColorVar } from 'client/theme/colorVars';

export function HistoricalProductDepositAprChart() {
  const { data: allEdgeSpotProductsData } = useAllEdgeSpotProducts();
  const {
    selectOptions,
    selectedOption,
    open: selectOpen,
    onValueChange: onSelectValueChange,
    value: selectValue,
    onOpenChange: onSelectOpenChange,
  } = useProductsSelect({ markets: allEdgeSpotProductsData });

  const { data, isLoading } = useHistoricalProductDepositAprChartData({
    selectedProduct: selectedOption?.value,
  });
  const { xAxisTickFormatter } = useChartTimeframe();

  return (
    <StatsChart
      chartTitle="Historical Deposit APRs"
      chartDescription="The daily average rate, compounded to an annualized value for the selected asset."
      data={data?.depositAprs}
      headerEndElement={
        <ProductsSelect
          selectOptions={selectOptions}
          selectedProduct={selectedOption?.value}
          open={selectOpen}
          onValueChange={onSelectValueChange}
          value={selectValue}
          onOpenChange={onSelectOpenChange}
        />
      }
      configByDataKey={{
        depositAprFraction: {
          color: getEdgeStatsColorVar('chart-fill'),
          dataKey: 'depositAprFraction',
          label: 'Deposit APR',
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
      isLoading={isLoading}
    />
  );
}
