import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Icons } from '@vertex-protocol/web-ui';
import { DataCard } from 'client/components/DataCard';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useRealizedPnlEventsTable } from 'client/modules/tables/hooks/useRealizedPnlEventsTable';
import { MobileTradingTabDataCardHeader } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCardHeader';
import { MobileTradingTabDataCards } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCards';
import { MobileTradingTabActions } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabActions';
import { HistoricalTradesFilterOptionID } from 'client/modules/trading/components/TradingTableTabs/types';
import { TradingTabFilters } from 'client/modules/trading/layout/types';
import { MarketFilter } from 'client/types/MarketFilter';
import { signDependentValue } from '@vertex-protocol/react-client';

interface Props {
  marketFilter: MarketFilter | undefined;
  tradingTabFilters:
    | TradingTabFilters<HistoricalTradesFilterOptionID>
    | undefined;
}

export function MobileTradingTabRealizedPnlEvents({
  marketFilter,
  tradingTabFilters,
}: Props) {
  const { mappedData, isLoading } = useRealizedPnlEventsTable({
    marketFilter,
    enablePagination: false,
    pageSize: 10,
  });
  const { show } = useDialog();

  return (
    <>
      <MobileTradingTabActions filters={tradingTabFilters} />
      <MobileTradingTabDataCards
        type="realized_pnl_history"
        isLoading={isLoading}
        hasData={!!mappedData?.length}
      >
        {mappedData?.map((item, index) => (
          <DataCard.Container key={index}>
            <MobileTradingTabDataCardHeader
              productIdForTradingLink={item.productId}
              marketName={item.marketInfo.marketName}
              marketIconSrc={item.marketInfo.icon.asset}
              timeMillis={item.timestampMillis}
              amountForSide={item.marketInfo.amountForSide}
              iconButtonProps={{
                icon: Icons.ShareFatFill,
                onClick: () =>
                  show({
                    type: 'perp_pnl_social_sharing',
                    params: {
                      marketInfo: item.marketInfo,
                      entryPrice: item.entryPrice,
                      referencePrice: item.exitPrice,
                      pnlFrac: item.pnlInfo.realizedPnlFrac,
                      isRealized: true,
                    },
                  }),
              }}
            />
            <DataCard.Items>
              <DataCard.Item
                label="Type"
                valueClassName="capitalize"
                valueContent={item.marginModeType}
              />
              <DataCard.Item
                label="Realized PnL"
                valueClassName={signDependentValue(
                  item.pnlInfo.realizedPnlUsd,
                  {
                    positive: 'text-positive',
                    negative: 'text-negative',
                    zero: 'text-text-primary',
                  },
                )}
                valueContent={`${formatNumber(item.pnlInfo.realizedPnlUsd, {
                  formatSpecifier:
                    CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
                })} (${formatNumber(item.pnlInfo.realizedPnlFrac, {
                  formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
                })})`}
              />
              <DataCard.Item
                label="Entry Price"
                value={item.entryPrice}
                numberFormatSpecifier={item.marketPriceFormatSpecifier}
              />
              <DataCard.Item
                label="Exit Price"
                value={item.exitPrice}
                numberFormatSpecifier={item.marketPriceFormatSpecifier}
              />
              <DataCard.Item
                label="Amount"
                value={item.filledAmountAbs}
                valueEndElement={item.marketInfo.symbol}
                numberFormatSpecifier={item.marketSizeFormatSpecifier}
              />
            </DataCard.Items>
          </DataCard.Container>
        ))}
      </MobileTradingTabDataCards>
    </>
  );
}
