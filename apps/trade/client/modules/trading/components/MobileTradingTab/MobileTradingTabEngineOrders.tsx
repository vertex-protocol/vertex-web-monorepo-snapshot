import { ProductEngineType } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
  signDependentValue,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { CancelAllOrdersButton } from 'client/components/ActionButtons/CancelAllOrdersButton';
import { CancelOrderButton } from 'client/components/ActionButtons/CancelOrderButton';
import { DataCard } from 'client/components/DataCard';
import { useOpenEngineOrdersTable } from 'client/modules/tables/hooks/useOpenEngineOrdersTable';
import { MobileTradingTabActions } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabActions';
import { MobileTradingTabDataCardHeader } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCardHeader';
import { MobileTradingTabDataCards } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCards';
import { OpenOrdersFilterOptionID } from 'client/modules/trading/components/TradingTableTabs/types';
import { TradingTabFilters } from 'client/modules/trading/layout/types';
import { getOrderSideLabel } from 'client/modules/trading/utils/getOrderSideLabel';
import { MarketFilter } from 'client/types/MarketFilter';

interface Props {
  marketFilter: MarketFilter | undefined;
  tradingTabFilters: TradingTabFilters<OpenOrdersFilterOptionID>;
}

export function MobileTradingTabEngineOrders({
  marketFilter,
  tradingTabFilters,
}: Props) {
  const { data, isLoading } = useOpenEngineOrdersTable(marketFilter);

  return (
    <>
      <MobileTradingTabActions
        filters={tradingTabFilters}
        actionButton={
          <CancelAllOrdersButton
            ordersFilter={{ ...marketFilter, isTrigger: false }}
          />
        }
      />
      <MobileTradingTabDataCards
        type="open_limit_orders"
        isLoading={isLoading}
        hasData={!!data?.length}
      >
        {data?.map((order) => (
          <DataCard.Container key={order.digest}>
            <MobileTradingTabDataCardHeader
              productIdForTradingLink={order.productId}
              marketName={order.marketInfo.marketName}
              marketIconSrc={order.marketInfo.icon.asset}
              timeMillis={order.timePlacedMillis}
            />
            <DataCard.Items>
              <DataCard.Item
                label="Action"
                valueClassName={joinClassNames(
                  'uppercase',
                  signDependentValue(order.marketInfo.amountForSide, {
                    positive: 'text-positive',
                    negative: 'text-negative',
                    zero: 'text-text-primary',
                  }),
                )}
                valueContent={getOrderSideLabel({
                  isPerp:
                    order.marketInfo.productType === ProductEngineType.PERP,
                  alwaysShowOrderDirection: true,
                  amountForSide: order.marketInfo.amountForSide,
                })}
              />
              <DataCard.Item
                label="Type"
                valueClassName="capitalize"
                valueContent={order.marginModeType}
              />
              <DataCard.Item
                label="Price"
                value={order.price}
                numberFormatSpecifier={order.priceFormatSpecifier}
              />
              <DataCard.Item
                label="Amount"
                value={order.totalSize}
                numberFormatSpecifier={order.sizeFormatSpecifier}
                valueEndElement={order.marketInfo.symbol}
              />
              <DataCard.Item
                label="Margin"
                value={order.isoMarginTransfer}
                numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
                // If no margin transfer, show just `-` without the USDC symbol
                valueEndElement={
                  order.isoMarginTransfer ? order.marketInfo.quoteSymbol : ''
                }
              />
              <DataCard.Item
                label="Filled / %"
                valueContent={`${formatNumber(order.filled.amount.abs(), {
                  formatSpecifier: order.sizeFormatSpecifier,
                })} ${order.marketInfo.symbol} / ${formatNumber(
                  order.filled.fraction,
                  {
                    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
                  },
                )}`}
              />
            </DataCard.Items>
            <CancelOrderButton order={order.orderForCancellation} />
          </DataCard.Container>
        ))}
      </MobileTradingTabDataCards>
    </>
  );
}
