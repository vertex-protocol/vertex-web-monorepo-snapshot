import { TimeInSeconds } from '@vertex-protocol/utils';
import { RiskWarningIcon } from 'client/components/Icons/RiskWarningIcon';
import { LiquidationRiskBar } from 'client/components/LiquidationRiskBar';
import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { useSubaccountTimespanMetrics } from 'client/hooks/subaccount/useSubaccountTimespanMetrics';
import { useUserRiskWarningState } from 'client/hooks/subaccount/useUserRiskWarningState';
import {
  NAV_ACCOUNT_PIN_STORAGE_IDS,
  NavAccountPinID,
} from 'client/modules/localstorage/userSettings/types/navAccountPins';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getLiquidationRiskLevelClassNames } from 'client/utils/getLiquidationRiskLevelClassNames';
import { signDependentValue } from 'client/utils/signDependentValue';
import { ReactNode, useCallback, useMemo } from 'react';

const MAX_NUM_PINS = 3;

export interface NavAccountInfoPinItem {
  localStorageId: NavAccountPinID;
  isPinned: boolean;
  valueClassName?: string;
  label: string;
  value: ReactNode;
}

export interface UseNavAccountInfoPins {
  pinnedItems: NavAccountInfoPinItem[];
  pinSections: Array<NavAccountInfoPinItem[]>;
  maxNumPins: number;

  toggleIsPinned(localStorageId: NavAccountPinID): void;
}

export function useNavAccountInfoPins(): UseNavAccountInfoPins {
  const { data: derivedOverview } = useDerivedSubaccountOverview();
  const { savedUserSettings, setSavedUserSettings } = useSavedUserSettings();
  const { data: timespanMetrics } = useSubaccountTimespanMetrics(
    TimeInSeconds.DAY,
  );

  const userRiskWarningState = useUserRiskWarningState();

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

  const accountSection: NavAccountInfoPinItem[] = useMemo(() => {
    return [
      {
        localStorageId: 'accountValue',
        label: 'Acct. Value',
        isPinned: getIsPinned('accountValue'),
        value: formatNumber(derivedOverview?.portfolioValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        }),
      },
      {
        localStorageId: '24hPnl',
        label: '24h Acct. PnL',
        isPinned: getIsPinned('24hPnl'),
        value: formatNumber(timespanMetrics?.deltas.cumulativeAccountPnlUsd, {
          formatSpecifier: CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
        }),
        valueClassName: signDependentValue(
          timespanMetrics?.deltas.cumulativeAccountPnlUsd,
          {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: 'text-text-primary',
          },
        ),
      },
      {
        localStorageId: 'perpPnl',
        label: 'Open Perps PnL',
        isPinned: getIsPinned('perpPnl'),
        value: formatNumber(derivedOverview?.perp.totalUnrealizedPnlUsd, {
          formatSpecifier: CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
        }),
        valueClassName: signDependentValue(
          derivedOverview?.perp.totalUnrealizedPnlUsd,
          {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: 'text-text-primary',
          },
        ),
      },
      {
        localStorageId: 'assets',
        label: 'Assets',
        isPinned: getIsPinned('assets'),
        value: formatNumber(derivedOverview?.spot.totalDepositsValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        }),
      },
      {
        localStorageId: 'borrows',
        label: 'Borrows',
        isPinned: getIsPinned('borrows'),
        value: formatNumber(derivedOverview?.spot.totalBorrowsValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        }),
      },
      {
        localStorageId: 'lpPositions',
        label: 'LP Positions',
        isPinned: getIsPinned('lpPositions'),
        value: formatNumber(derivedOverview?.lp.totalValueUsd, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        }),
      },
    ];
  }, [
    getIsPinned,
    derivedOverview?.portfolioValueUsd,
    derivedOverview?.perp.totalUnrealizedPnlUsd,
    derivedOverview?.spot.totalDepositsValueUsd,
    derivedOverview?.spot.totalBorrowsValueUsd,
    derivedOverview?.lp.totalValueUsd,
    timespanMetrics?.deltas.cumulativeAccountPnlUsd,
  ]);

  const marginSection: NavAccountInfoPinItem[] = useMemo(() => {
    return [
      {
        localStorageId: 'marginUsage',
        label: 'Margin Usage',
        isPinned: getIsPinned('marginUsage'),
        value: formatNumber(derivedOverview?.marginUsageFractionBounded, {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        }),
      },
      {
        localStorageId: 'fundsAvailable',
        label: 'Funds Avail.',
        isPinned: getIsPinned('fundsAvailable'),
        value: (
          <div className="flex items-center gap-x-1">
            {userRiskWarningState === 'no_funds_available' ? (
              <RiskWarningIcon
                size="sm"
                userRiskWarningState="no_funds_available"
              />
            ) : null}
            {formatNumber(derivedOverview?.fundsAvailableBounded, {
              formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
            })}
          </div>
        ),
      },
    ];
  }, [
    getIsPinned,
    derivedOverview?.fundsAvailableBounded,
    derivedOverview?.marginUsageFractionBounded,
    userRiskWarningState,
  ]);

  const riskSection: NavAccountInfoPinItem[] = useMemo(() => {
    return [
      {
        localStorageId: 'leverage',
        label: 'Acct. Leverage',
        isPinned: getIsPinned('leverage'),
        value: `${formatNumber(derivedOverview?.accountLeverage, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_1DP,
        })}x`,
      },
      {
        localStorageId: 'fundsUntilLiquidation',
        label: 'Funds Until Liq.',
        isPinned: getIsPinned('fundsUntilLiquidation'),
        value: formatNumber(derivedOverview?.fundsUntilLiquidationBounded, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        }),
      },
      {
        localStorageId: 'liquidationRisk',
        label: 'Liq. Risk',
        isPinned: getIsPinned('liquidationRisk'),
        value: (
          <div className="flex items-center gap-x-1">
            <LiquidationRiskBar
              liquidationRiskFraction={
                derivedOverview?.liquidationRiskFractionBounded
              }
              className="w-7"
            />
            {formatNumber(derivedOverview?.liquidationRiskFractionBounded, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </div>
        ),
        valueClassName: getLiquidationRiskLevelClassNames(
          derivedOverview?.liquidationRiskFractionBounded,
        ).text,
      },
    ];
  }, [
    getIsPinned,
    derivedOverview?.accountLeverage,
    derivedOverview?.fundsUntilLiquidationBounded,
    derivedOverview?.liquidationRiskFractionBounded,
  ]);

  const pinSections: Array<NavAccountInfoPinItem[]> = useMemo(() => {
    return [accountSection, marginSection, riskSection];
  }, [accountSection, marginSection, riskSection]);

  const pinnedItems = useMemo(() => {
    if (!pinSections) {
      return [];
    }

    return pinSections
      .flatMap((section) => section.filter((item) => item.isPinned))
      .slice(0, MAX_NUM_PINS);
  }, [pinSections]);

  return {
    pinnedItems,
    pinSections,
    maxNumPins: MAX_NUM_PINS,
    toggleIsPinned,
  };
}
