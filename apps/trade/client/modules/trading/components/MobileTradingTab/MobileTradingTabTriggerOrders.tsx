import { ProductEngineType } from '@vertex-protocol/client';
import { formatNumber } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { CancelAllOrdersButton } from 'client/components/ActionButtons/CancelAllOrdersButton';
import { DataCard } from 'client/components/DataCard';
import { useOpenTriggerOrdersTable } from 'client/modules/tables/hooks/useOpenTriggerOrdersTable';
import { MobileTradingTabDataCardHeader } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCardHeader';
import { MobileTradingTabDataCards } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCards';
import { MobileTradingTabActions } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabActions';
import { OpenOrdersFilterOptionID } from 'client/modules/trading/components/TradingTableTabs/types';
import { TradingTabFilters } from 'client/modules/trading/layout/types';
import { isTpSlOrderSize } from 'client/modules/trading/tpsl/utils/isTpSlOrderSize';
import { getOrderSideLabel } from 'client/modules/trading/utils/getOrderSideLabel';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';
import { MarketFilter } from 'client/types/MarketFilter';
import { signDependentValue } from '@vertex-protocol/react-client';
import { CancelOrderButton } from 'client/components/ActionButtons/CancelOrderButton';

interface Props {
  marketFilter: MarketFilter | undefined;
  tradingTabFilters: TradingTabFilters<OpenOrdersFilterOptionID>;
}

export function MobileTradingTabTriggerOrders({
  marketFilter,
  tradingTabFilters,
}: Props) {
  const { data, isLoading } = useOpenTriggerOrdersTable(marketFilter);

  return (
    <>
      <MobileTradingTabActions
        filters={tradingTabFilters}
        actionButton={
          <CancelAllOrdersButton
            ordersFilter={{ ...marketFilter, isTrigger: true }}
          />
        }
      />
      <MobileTradingTabDataCards
        type="open_trigger_orders"
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
                valueContent={getOrderTypeLabel(
                  order.orderType,
                  order.marginModeType,
                )}
              />
              <DataCard.Item
                label="Trigger Price"
                value={order.triggerPrice}
                numberFormatSpecifier={order.priceFormatSpecifier}
              />
              <DataCard.Item
                label="Amount"
                valueContent={
                  isTpSlOrderSize(order.totalSize)
                    ? 'MAX'
                    : formatNumber(order.totalSize, {
                        formatSpecifier: order.sizeFormatSpecifier,
                      })
                }
              />
              <DataCard.Item
                label="Limit Price"
                value={order.orderPrice}
                numberFormatSpecifier={order.priceFormatSpecifier}
              />
            </DataCard.Items>
            <CancelOrderButton order={order.orderForCancellation} />
          </DataCard.Container>
        ))}
      </MobileTradingTabDataCards>
    </>
  );
}
