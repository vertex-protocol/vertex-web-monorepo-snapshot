import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { RiskWarningIcon } from 'client/components/Icons/RiskWarningIcon';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { EstimatedSubaccountInfo } from 'client/hooks/subaccount/useEstimateSubaccountInfoChange';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useUserRiskWarningState } from 'client/hooks/subaccount/useUserRiskWarningState';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function AccountHealthPanel<T>({
  className,
  currentState,
  estimatedState,
}: WithClassnames<{
  currentState: EstimatedSubaccountInfo<T> | undefined;
  estimatedState: EstimatedSubaccountInfo<T> | undefined;
}>) {
  const { trackEvent } = useAnalyticsContext();
  const userRiskWarningState = useUserRiskWarningState();
  const { show } = useDialog();
  const userActionState = useUserActionState();

  return (
    <div className={joinClassNames('flex flex-col gap-y-2', className)}>
      <div className="text-text-primary flex justify-between gap-x-2 text-xs">
        Account
        <RiskWarningIcon
          size="sm"
          userRiskWarningState={userRiskWarningState}
        />
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label="Margin Usage:"
            value={currentState?.marginUsageBounded}
            newValue={estimatedState?.marginUsageBounded}
            numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
            tooltip={{ id: 'marginUsage' }}
          />

          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label="Funds Available:"
            value={currentState?.fundsAvailableUsdBounded}
            newValue={estimatedState?.fundsAvailableUsdBounded}
            numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
            tooltip={{ id: 'fundsAvailable' }}
          />
          <ValueWithLabel.Horizontal
            sizeVariant="xs"
            label="Account Leverage:"
            outerValueClassName="gap-x-0"
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_1DP}
            valueEndElement="x"
            value={currentState?.leverage}
            newValue={estimatedState?.leverage}
            tooltip={{ id: 'accountLeverage' }}
          />
        </div>
        <div
          className={joinClassNames('flex items-center gap-x-2.5', className)}
        >
          <SecondaryButton
            className="flex-1"
            disabled={userActionState === 'block_all'}
            onClick={() => {
              show({ type: 'deposit', params: {} });
              trackEvent({
                type: 'trade_page_collateral_action_clicked',
                data: {
                  action: 'deposit',
                },
              });
            }}
          >
            Deposit
          </SecondaryButton>
          <SecondaryButton
            className="flex-1"
            disabled={userActionState !== 'allow_all'}
            onClick={() => {
              show({ type: 'withdraw', params: {} });
              trackEvent({
                type: 'trade_page_collateral_action_clicked',
                data: {
                  action: 'withdraw',
                },
              });
            }}
          >
            Withdraw
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
