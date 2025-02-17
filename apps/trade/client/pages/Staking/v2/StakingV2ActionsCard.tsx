import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  formatTimestamp,
  PrimaryButton,
  SecondaryButton,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';

import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useRepeatedClickCountHandler } from 'client/hooks/ui/useRepeatedClickCountHandler';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useSwitchToProtocolTokenChainEnv } from 'client/hooks/util/useSwitchToProtocolTokenChainEnv';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { StakingCard } from 'client/pages/Staking/components/StakingCard';
import { StakingSecondaryClaimButton } from 'client/pages/Staking/components/StakingSecondaryClaimButton';
import { STAKING_DESKTOP_ACTION_BUTTON_WIDTH } from 'client/pages/Staking/consts';

interface Props {
  isUnstakedClaimable: boolean;
  unstakedClaimable: BigDecimal | undefined;
  unstakedClaimableTimeMillis: number | undefined;
  isWithdrawUnstakedTxLoading: boolean;
  protocolTokenSymbol: string;

  withdrawUnstaked(): void;
}

export function StakingV2ActionsCard({
  isUnstakedClaimable,
  protocolTokenSymbol,
  unstakedClaimable,
  unstakedClaimableTimeMillis,
  withdrawUnstaked,
  isWithdrawUnstakedTxLoading,
}: Props) {
  const { show } = useDialog();
  const isConnected = useIsConnected();
  const {
    switchToProtocolTokenChainEnv,
    isOnProtocolTokenChainEnv,
    protocolTokenChainName,
  } = useSwitchToProtocolTokenChainEnv();

  // Show the hidden dialog to set trading wallet for MM's
  const onTitleClick = useRepeatedClickCountHandler({
    handler: (count) => {
      if (count === 3) {
        show({
          type: 'staking_set_trading_wallet',
          params: {},
        });
      }
    },
  });

  const stakingCtaButtonContent = (() => {
    if (!isOnProtocolTokenChainEnv) {
      return (
        <PrimaryButton size="base" onClick={switchToProtocolTokenChainEnv}>
          Switch to {protocolTokenChainName}
        </PrimaryButton>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <PrimaryButton
          disabled={!isConnected}
          onClick={() => show({ type: 'stake_v2_vrtx', params: {} })}
        >
          Stake
        </PrimaryButton>
        <SecondaryButton
          disabled={!isConnected}
          onClick={() => show({ type: 'unstake_v2_vrtx', params: {} })}
        >
          Unstake
        </SecondaryButton>
      </div>
    );
  })();

  return (
    <StakingCard titleContent={<span onClick={onTitleClick}>Actions</span>}>
      <div className="flex flex-col gap-y-2.5">
        <span className="text-text-tertiary text-xs leading-snug">
          Stake and earn compounding {protocolTokenSymbol}. Edge fees are
          redirected to the staking pool.
        </span>
        {stakingCtaButtonContent}
      </div>
      <div
        className={joinClassNames(
          'mt-auto flex flex-col gap-y-4',
          'lg:flex-row lg:items-center lg:justify-between',
        )}
      >
        <div className="flex flex-col gap-x-8 gap-y-4 sm:flex-row">
          <ValueWithLabel.Vertical
            sizeVariant="sm"
            tooltip={{ id: 'stakingV2UnstakedUnlocking' }}
            label={
              isUnstakedClaimable ? 'Unstaked Claimable' : 'Unstaked Locked'
            }
            value={unstakedClaimable}
            valueEndElement={protocolTokenSymbol}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          />
          {!isUnstakedClaimable && (
            <ValueWithLabel.Vertical
              sizeVariant="sm"
              label="Unlock Time"
              valueContent={formatTimestamp(unstakedClaimableTimeMillis, {
                formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
              })}
            />
          )}
        </div>
        {isUnstakedClaimable && isOnProtocolTokenChainEnv && (
          <StakingSecondaryClaimButton
            className={STAKING_DESKTOP_ACTION_BUTTON_WIDTH}
            isLoading={isWithdrawUnstakedTxLoading}
            onClick={withdrawUnstaked}
            disabled={!isUnstakedClaimable}
          >
            {isWithdrawUnstakedTxLoading ? 'Confirm Claim' : 'Claim Unstaked'}
          </StakingSecondaryClaimButton>
        )}
      </div>
    </StakingCard>
  );
}
