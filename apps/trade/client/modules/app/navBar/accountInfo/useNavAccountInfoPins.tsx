import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { TimeInSeconds } from '@vertex-protocol/utils';
import { LiquidationRiskBar } from 'client/components/LiquidationRiskBar';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { useSubaccountTimespanMetrics } from 'client/hooks/subaccount/useSubaccountTimespanMetrics';
import {
  NAV_ACCOUNT_PIN_STORAGE_IDS,
  NavAccountPinID,
} from 'client/modules/localstorage/userSettings/types/navAccountPins';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import { getLiquidationRiskLevelClassNames } from 'client/utils/getLiquidationRiskLevelClassNames';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';
import { useCallback, useMemo } from 'react';

const MAX_NUM_PINS = 3;

export type NavAccountInfoPinItem = ValueWithLabelProps & {
  localStorageId: NavAccountPinID;
  isPinned: boolean;
};

export function useNavAccountInfoPins() {
  const { data: subaccountOverview } = useSubaccountOverview();
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();
  const { data: timespanMetrics } = useSubaccountTimespanMetrics(
    TimeInSeconds.DAY,
  );

  const toggleIsPinned = useCallback(
    (id: NavAccountPinID) => {
      setSavedUserSettings((prev) => {
        // This ensures that we don't have orphaned IDs if we change a given localstorage ID
        // Otherwise, say we have an ID of "x" that is originally pinned, but we change it to "y"
        // Then the saved pinned items will still have "x" in it, resulting in ["x", "y"] but only "y" will be shown
        const prevPinned = prev.navPins.filter((id) =>
          NAV_ACCOUNT_PIN_STORAGE_IDS.includes(id),
        );
        prev.navPins = prevPinned;

        // No-op, at max and not toggling off
        if (prevPinned.length >= MAX_NUM_PINS && !prevPinned.includes(id)) {
          return prev;
        }

        const newPinned = prevPinned.includes(id)
          ? prevPinned.filter((item) => item !== id)
          : [...prevPinned, id];

        prev.navPins = newPinned;

        return prev;
      });
    },
    [setSavedUserSettings],
  );

  const getIsPinned = useCallback(
    (id: NavAccountPinID) => savedUserSettings.navPins.includes(id),
    [savedUserSettings],
  );

  const items: NavAccountInfoPinItem[] = useMemo(() => {
    return [
      {
        localStorageId: 'accountValue',
        label: 'Acct. Value',
        isPinned: getIsPinned('accountValue'),
        value: subaccountOverview?.portfolioValueUsd,
        numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      },
      {
        localStorageId: '24hChange',
        label: '24h Acct. Change',
        isPinned: getIsPinned('24hChange'),
        value: timespanMetrics?.deltas.portfolioValueUsd,
        numberFormatSpecifier: CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
        valueClassName: getSignDependentColorClassName(
          timespanMetrics?.deltas.cumulativeAccountPnlUsd,
        ),
      },
      {
        localStorageId: 'fundsAvailable',
        label: 'Funds Available',
        isPinned: getIsPinned('fundsAvailable'),
        valueContent: (
          <div className="flex items-center gap-x-1">
            {formatNumber(subaccountOverview?.fundsAvailableBoundedUsd, {
              formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
            })}
          </div>
        ),
      },
      {
        localStorageId: 'unrealizedPnl',
        label: 'Unrealized PnL',
        isPinned: getIsPinned('unrealizedPnl'),
        value: subaccountOverview?.perp.totalUnrealizedPnlUsd,
        numberFormatSpecifier: PresetNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
        valueClassName: getSignDependentColorClassName(
          subaccountOverview?.perp.totalUnrealizedPnlUsd,
        ),
      },
      {
        localStorageId: 'leverage',
        label: 'Cross Leverage',
        isPinned: getIsPinned('leverage'),
        valueContent: `${formatNumber(subaccountOverview?.accountLeverage, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_1DP,
        })}x`,
      },
      {
        localStorageId: 'liquidationRisk',
        label: 'Cross Liq. Risk',
        isPinned: getIsPinned('liquidationRisk'),
        valueContent: (
          <div className="flex items-center gap-x-1">
            <LiquidationRiskBar
              liquidationRiskFraction={
                subaccountOverview?.liquidationRiskFractionBounded
              }
              className="w-7"
            />
            {formatNumber(subaccountOverview?.liquidationRiskFractionBounded, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </div>
        ),
        valueClassName: getLiquidationRiskLevelClassNames(
          subaccountOverview?.liquidationRiskFractionBounded,
        ).text,
      },
      {
        localStorageId: 'isoMargin',
        label: 'Isolated Margin',
        isPinned: getIsPinned('isoMargin'),
        value: subaccountOverview?.perp.iso.totalNetMarginUsd,
        numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      },
    ];
  }, [
    getIsPinned,
    subaccountOverview?.fundsAvailableBoundedUsd,
    subaccountOverview?.perp.iso.totalNetMarginUsd,
    subaccountOverview?.perp.totalUnrealizedPnlUsd,
    subaccountOverview?.liquidationRiskFractionBounded,
    subaccountOverview?.accountLeverage,
    subaccountOverview?.portfolioValueUsd,
    timespanMetrics?.deltas.portfolioValueUsd,
    timespanMetrics?.deltas.cumulativeAccountPnlUsd,
  ]);

  const pinnedItems = useMemo(() => {
    return items.filter((item) => item.isPinned).slice(0, MAX_NUM_PINS);
  }, [items]);

  return {
    items,
    pinnedItems,
    maxNumPins: MAX_NUM_PINS,
    toggleIsPinned,
  };
}
