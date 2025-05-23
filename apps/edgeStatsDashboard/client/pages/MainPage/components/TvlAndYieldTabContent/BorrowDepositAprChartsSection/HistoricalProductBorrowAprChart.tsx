import { percentagePreciseAxisFormatter } from 'client/components/charts/axisFormatters';
import { StatsChart } from 'client/components/charts/StatsChart/StatsChart';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { ProductsSelect } from 'client/pages/MainPage/components/common/ProductsSelect/ProductsSelect';
import { useProductsSelect } from 'client/pages/MainPage/components/common/ProductsSelect/useProductsSelect';
import { useHistoricalProductBorrowAprChartData } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprChartsSection/useHistoricalProductBorrowAprChartData';
import { useAllEdgeSpotProducts } from 'client/pages/MainPage/components/TvlAndYieldTabContent/hooks/useAllEdgeSpotProducts';
import { getEdgeStatsColorVar } from 'client/theme/colorVars';

export function HistoricalProductBorrowAprChart() {
  const { data: allEdgeSpotProductsData } = useAllEdgeSpotProducts();
  const {
    selectOptions,
    open: selectOpen,
    onValueChange: onSelectValueChange,
    value: selectValue,
    onOpenChange: onSelectOpenChange,
    selectedOption,
  } = useProductsSelect({ markets: allEdgeSpotProductsData });

  const { xAxisTickFormatter } = useChartTimeframe();
  const { data, isLoading } = useHistoricalProductBorrowAprChartData({
    selectedProduct: selectedOption?.value,
  });

  return (
    <StatsChart
      chartTitle="Historical Borrow APRs"
      chartDescription="The daily average rate, compounded to an annualized value for the selected asset."
      data={data?.borrowAprs}
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
        borrowAprFraction: {
          color: getEdgeStatsColorVar('chart-fill'),
          dataKey: 'borrowAprFraction',
          label: 'Borrow APR',
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
