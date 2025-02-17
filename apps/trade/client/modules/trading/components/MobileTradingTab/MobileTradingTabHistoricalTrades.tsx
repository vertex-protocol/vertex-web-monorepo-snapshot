import { ProductEngineType } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { DataCard } from 'client/components/DataCard';
import { useHistoricalTradesTable } from 'client/modules/tables/hooks/useHistoricalTradesTable';
import { MobileTradingTabDataCardHeader } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCardHeader';
import { MobileTradingTabDataCards } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCards';
import { MobileTradingTabActions } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabActions';
import { HistoricalTradesFilterOptionID } from 'client/modules/trading/components/TradingTableTabs/types';
import { TradingTabFilters } from 'client/modules/trading/layout/types';
import { getOrderSideLabel } from 'client/modules/trading/utils/getOrderSideLabel';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';
import { MarketFilter } from 'client/types/MarketFilter';
import { signDependentValue } from '@vertex-protocol/react-client';

interface Props {
  marketFilter: MarketFilter | undefined;
  tradingTabFilters: TradingTabFilters<HistoricalTradesFilterOptionID>;
}

export function MobileTradingTabHistoricalTrades({
  marketFilter,
  tradingTabFilters,
}: Props) {
  const { mappedData, isLoading } = useHistoricalTradesTable({
    marketFilter,
    enablePagination: false,
    pageSize: 10,
  });

  return (
    <>
      <MobileTradingTabActions filters={tradingTabFilters} />
      <MobileTradingTabDataCards
        type="trades_history"
        isLoading={isLoading}
        hasData={!!mappedData?.length}
      >
        {mappedData?.map((item, index) => (
          <DataCard.Container key={index}>
            <MobileTradingTabDataCardHeader
              marketName={item.marketInfo.marketName}
              marketIconSrc={item.marketInfo.icon.asset}
              timeMillis={item.timestampMillis}
            />
            <DataCard.Items>
              <DataCard.Item
                label="Action"
                valueClassName={joinClassNames(
                  'uppercase',
                  signDependentValue(item.marketInfo.amountForSide, {
                    positive: 'text-positive',
                    negative: 'text-negative',
                    zero: 'text-text-primary',
                  }),
                )}
                valueContent={getOrderSideLabel({
                  isPerp:
                    item.marketInfo.productType === ProductEngineType.PERP,
                  alwaysShowOrderDirection: true,
                  amountForSide: item.marketInfo.amountForSide,
                })}
              />
              <DataCard.Item
                label="Type"
                valueContent={getOrderTypeLabel(
                  item.orderType,
                  item.marginModeType,
                )}
              />
              <DataCard.Item
                label="Avg. Price"
                value={item.filledPrice}
                numberFormatSpecifier={item.marketPriceFormatSpecifier}
              />
              <DataCard.Item
                label="Amount"
                value={item.filledAmountAbs}
                valueEndElement={item.marketInfo.symbol}
                numberFormatSpecifier={item.marketSizeFormatSpecifier}
              />
              <DataCard.Item
                label="Total"
                value={item.tradeTotalCost}
                valueEndElement={item.marketInfo.quoteSymbol}
                numberFormatSpecifier={item.quoteSizeFormatSpecifier}
              />
              <DataCard.Item
                label="Fee"
                value={item.tradeFeeQuote}
                valueEndElement={item.marketInfo.quoteSymbol}
                numberFormatSpecifier={item.quoteSizeFormatSpecifier}
              />
            </DataCard.Items>
          </DataCard.Container>
        ))}
      </MobileTradingTabDataCards>
    </>
  );
}
