import {
  formatNumber,
  PresetNumberFormatSpecifier,
  CustomNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { DataCard } from 'client/components/DataCard';
import { useSpotBalancesTable } from 'client/modules/tables/hooks/useSpotBalancesTable';
import { MobileTradingTabDataCardHeader } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCardHeader';
import { MobileTradingTabDataCards } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabDataCards';
import { MobileTradingTabActions } from 'client/modules/trading/components/MobileTradingTab/components/MobileTradingTabActions';
import { MobileTradingTabSpotActionButtons } from 'client/modules/trading/components/MobileTradingTab/MobileTradingTabSpotBalances/MobileTradingTabSpotBalancesActionButtons';
import { BalancesFilterOptionID } from 'client/modules/trading/components/TradingTableTabs/types';
import { TradingTabFilters } from 'client/modules/trading/layout/types';
import { MarketFilter } from 'client/types/MarketFilter';

interface Props {
  marketFilter: MarketFilter | undefined;
  tradingTabFilters: TradingTabFilters<BalancesFilterOptionID> | undefined;
}

export function MobileTradingTabSpotBalances({
  marketFilter,
  tradingTabFilters,
}: Props) {
  const { balances, isLoading } = useSpotBalancesTable({ marketFilter });

  return (
    <>
      <MobileTradingTabActions filters={tradingTabFilters} />
      <MobileTradingTabDataCards
        type="spot_balances"
        isLoading={isLoading}
        hasData={!!balances?.length}
      >
        {balances?.map((balance) => (
          <DataCard.Container key={balance.productId}>
            <MobileTradingTabDataCardHeader
              productIdForTradingLink={balance.productId}
              marketName={balance.metadata.token.symbol}
              marketIconSrc={balance.metadata.token.icon.asset}
            />
            <DataCard.Items>
              <DataCard.Item
                label="Your Balance"
                valueContent={
                  <>
                    {formatNumber(balance.balanceInfo.amount, {
                      formatSpecifier:
                        CustomNumberFormatSpecifier.NUMBER_PRECISE,
                    })}{' '}
                    <span className="text-2xs">
                      {balance.balanceInfo.symbol}
                    </span>{' '}
                    <span className="text-2xs text-text-tertiary">
                      (
                      {formatNumber(balance.balanceInfo.valueUsd, {
                        formatSpecifier:
                          PresetNumberFormatSpecifier.CURRENCY_2DP,
                      })}
                      )
                    </span>
                  </>
                }
              />
              <DataCard.Item
                label="Deposit APR"
                value={balance.depositAPR}
                numberFormatSpecifier={
                  PresetNumberFormatSpecifier.PERCENTAGE_2DP
                }
              />
              <DataCard.Item
                label="Borrow APR"
                value={balance.borrowAPR}
                numberFormatSpecifier={
                  PresetNumberFormatSpecifier.PERCENTAGE_2DP
                }
              />
            </DataCard.Items>
            <MobileTradingTabSpotActionButtons
              productId={balance.productId}
              balanceAmount={balance.balanceInfo.amount}
            />
          </DataCard.Container>
        ))}
      </MobileTradingTabDataCards>
    </>
  );
}
