import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Divider, Icons } from '@vertex-protocol/web-ui';
import { CloseAllPositionsButton } from 'client/components/ActionButtons/CloseAllPositionsButton';
import { DataCard } from 'client/components/DataCard';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { usePerpPositionsTable } from 'client/modules/tables/hooks/usePerpPositionsTable';
import { MobileTradingTabActions } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabActions';
import { MobileTradingTabDataCardHeader } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCardHeader';
import { MobileTradingTabDataCards } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCards';
import { MobileTradingTabPositionsActionButtons } from 'client/modules/trading/components/MobileTradingTab/MobileTradingTabPositions/MobileTradingTabPositionsActionButtons';
import { PositionsFilterOptionID } from 'client/modules/trading/components/TradingTableTabs/types';
import { TradingTabFilters } from 'client/modules/trading/layout/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { PnlValueWithPercentage } from 'client/components/PnlValueWithPercentage';

interface Props {
  marketFilter: MarketFilter | undefined;
  tradingTabFilters: TradingTabFilters<PositionsFilterOptionID> | undefined;
}

export function MobileTradingTabPositions({
  marketFilter,
  tradingTabFilters,
}: Props) {
  const { positions, isLoading } = usePerpPositionsTable({
    marketFilter,
  });
  const { show } = useDialog();

  return (
    <>
      <MobileTradingTabActions
        filters={tradingTabFilters}
        actionButton={<CloseAllPositionsButton />}
      />
      <MobileTradingTabDataCards
        type="perp_positions"
        isLoading={isLoading}
        hasData={!!positions?.length}
      >
        {positions?.map((position) => (
          <DataCard.Container key={position.productId}>
            <MobileTradingTabDataCardHeader
              productIdForTradingLink={position.productId}
              marketName={position.marketInfo.marketName}
              marketIconSrc={position.marketInfo.icon.asset}
              amountForSide={position.amountInfo.amount}
              iconButtonProps={{
                icon: Icons.ShareFatFill,
                onClick: () => {
                  if (
                    !position.pnlInfo.estimatedPnlFrac ||
                    !position.averageEntryPrice
                  ) {
                    return;
                  }
                  show({
                    type: 'perp_pnl_social_sharing',
                    params: {
                      marketInfo: position.marketInfo,
                      pnlFrac: position.pnlInfo.estimatedPnlFrac,
                      entryPrice: position.averageEntryPrice,
                      referencePrice: position.oraclePrice,
                      isRealized: false,
                    },
                  });
                },
              }}
            />
            <DataCard.Items>
              <DataCard.Item
                label="Type"
                valueClassName="capitalize"
                valueContent={position.margin.marginModeType}
                valueEndElement={
                  position.margin.isoLeverage ? (
                    <span className="text-accent">
                      {formatNumber(position.margin.isoLeverage, {
                        formatSpecifier: PresetNumberFormatSpecifier.NUMBER_1DP,
                      })}
                      x
                    </span>
                  ) : null
                }
              />
              <DataCard.Item
                label="Margin"
                value={
                  position.margin.isoMarginUsedUsd
                    ? position.margin.isoMarginUsedUsd
                    : position.margin.crossMarginUsedUsd
                }
                numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
              />
              <DataCard.Item
                label="Est. PnL"
                valueContent={
                  <PnlValueWithPercentage
                    pnlFrac={position.pnlInfo.estimatedPnlFrac}
                    pnlUsd={position.pnlInfo.estimatedPnlUsd}
                  />
                }
              />
              <DataCard.Item
                label="Position Size"
                valueContent={
                  <>
                    {formatNumber(position.amountInfo.amount, {
                      formatSpecifier: position.sizeFormatSpecifier,
                    })}{' '}
                    <span className="text-2xs">
                      {position.amountInfo.symbol}
                    </span>{' '}
                    <span className="text-2xs text-text-tertiary">
                      (
                      {formatNumber(position.amountInfo.notionalValueUsd, {
                        formatSpecifier:
                          PresetNumberFormatSpecifier.CURRENCY_2DP,
                      })}
                      )
                    </span>
                  </>
                }
              />
              <DataCard.Item
                label="Entry Price"
                value={position.averageEntryPrice}
                numberFormatSpecifier={position.priceFormatSpecifier}
              />
              <DataCard.Item
                label="Oracle Price"
                value={position.oraclePrice}
                numberFormatSpecifier={position.priceFormatSpecifier}
              />
              <DataCard.Item
                label="Liq. Price"
                value={position.estimatedLiquidationPrice ?? undefined}
                numberFormatSpecifier={position.priceFormatSpecifier}
              />
              <DataCard.Item
                label="Funding"
                valueContent={
                  <>
                    {formatNumber(position.netFunding, {
                      formatSpecifier:
                        PresetNumberFormatSpecifier.SIGNED_NUMBER_2DP,
                    })}{' '}
                    <span className="text-2xs">
                      {position.marketInfo.quoteSymbol}
                    </span>
                  </>
                }
              />
              <Divider />
              <DataCard.Item
                label="Take Profit / Stop Loss"
                valueContent={
                  <>
                    <span className="text-positive">
                      {formatNumber(
                        position.reduceOnlyOrders?.takeProfitTriggerPrice,
                        {
                          formatSpecifier: position.priceFormatSpecifier,
                        },
                      )}
                    </span>{' '}
                    /{' '}
                    <span className="text-negative">
                      {formatNumber(
                        position.reduceOnlyOrders?.stopLossTriggerPrice,
                        {
                          formatSpecifier: position.priceFormatSpecifier,
                        },
                      )}
                    </span>
                  </>
                }
              />
            </DataCard.Items>
            <MobileTradingTabPositionsActionButtons
              productId={position.productId}
              isoSubaccountName={position.isoSubaccountName}
              isoMarginUsedUsd={position.margin.isoMarginUsedUsd}
              hasReduceOnlyOrders={
                !!position.reduceOnlyOrders?.stopLossTriggerPrice ||
                !!position.reduceOnlyOrders?.takeProfitTriggerPrice
              }
            />
          </DataCard.Container>
        ))}
      </MobileTradingTabDataCards>
    </>
  );
}
