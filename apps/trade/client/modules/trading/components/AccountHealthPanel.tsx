import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { RiskWarningIcon } from 'client/components/Icons/RiskWarningIcon';
import { LineItem } from 'client/components/LineItem/LineItem';
import { EstimatedSubaccountInfo } from 'client/hooks/subaccount/useEstimateSubaccountInfoChange';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useUserRiskWarningState } from 'client/hooks/subaccount/useUserRiskWarningState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';

export function AccountHealthPanel<T>({
  className,
  currentState,
  estimatedState,
}: WithClassnames<{
  currentState: EstimatedSubaccountInfo<T> | undefined;
  estimatedState: EstimatedSubaccountInfo<T> | undefined;
}>) {
  const userRiskWarningState = useUserRiskWarningState();
  const { show } = useDialog();
  const userActionState = useUserActionState();

  return (
    <div className={joinClassNames('flex flex-col gap-y-2', className)}>
      <div className="text-text-primary flex justify-between gap-x-2 text-xs font-medium">
        Account
        <RiskWarningIcon
          size="sm"
          userRiskWarningState={userRiskWarningState}
        />
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <LineItem.MetricWithEstimation
            label="Margin Usage:"
            renderValue={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
            currentValue={currentState?.marginUsageBounded}
            estimatedValue={estimatedState?.marginUsageBounded}
            tooltip={{ id: 'marginUsage' }}
          />

          <LineItem.MetricWithEstimation
            label="Funds Available:"
            renderValue={PresetNumberFormatSpecifier.CURRENCY_2DP}
            currentValue={currentState?.fundsAvailableUsdBounded}
            estimatedValue={estimatedState?.fundsAvailableUsdBounded}
            tooltip={{ id: 'fundsAvailable' }}
          />
          <LineItem.MetricWithEstimation
            label="Account Leverage:"
            renderValue={(val) =>
              `${formatNumber(val, {
                formatSpecifier: PresetNumberFormatSpecifier.NUMBER_1DP,
              })}x`
            }
            currentValue={currentState?.leverage}
            estimatedValue={estimatedState?.leverage}
            tooltip={{ id: 'accountLeverage' }}
          />
        </div>
        <div
          className={joinClassNames('flex items-center gap-x-2.5', className)}
        >
          <SecondaryButton
            size="md"
            className="flex-1"
            disabled={userActionState === 'block_all'}
            onClick={() => show({ type: 'deposit', params: {} })}
          >
            Deposit
          </SecondaryButton>
          <SecondaryButton
            size="md"
            className="flex-1"
            disabled={userActionState !== 'allow_all'}
            onClick={() => show({ type: 'withdraw', params: {} })}
          >
            Withdraw
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
