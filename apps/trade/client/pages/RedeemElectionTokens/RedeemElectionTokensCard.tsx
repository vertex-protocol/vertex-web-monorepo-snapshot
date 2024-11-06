'use client';

import { KNOWN_PRODUCT_IDS } from '@vertex-protocol/metadata';
import {
  CustomNumberFormatSpecifier,
  useEVMContext,
  useIsChainType,
} from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Card, LinkButton, SecondaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useAllDepositableTokenBalances } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useExecuteRedeemElectionTokens } from 'client/pages/RedeemElectionTokens/useExecuteRedeemElectionTokens';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useCallback, useMemo } from 'react';

export function RedeemElectionTokensCard({ className }: WithClassnames) {
  const { isElectionMarketsEnabled } = useEnabledFeatures();
  const { setPrimaryChainEnv } = useEVMContext();

  const content = (() => {
    if (!isElectionMarketsEnabled) {
      return (
        <>
          <p className="text-sm">
            Please switch to Arbitrum or Base to redeem election prediction
            tokens
          </p>
          <div className="grid grid-cols-2 gap-2">
            <SecondaryButton
              onClick={() => {
                setPrimaryChainEnv('arbitrum');
              }}
            >
              Switch to Arbitrum
            </SecondaryButton>
            <SecondaryButton>Switch to Base</SecondaryButton>
          </div>
        </>
      );
    }

    return <RedeemContent />;
  })();

  return (
    <Card className={joinClassNames('flex flex-col gap-y-4 p-4', className)}>
      {content}
    </Card>
  );
}

function RedeemContent() {
  const { dispatchNotification } = useNotificationManagerContext();
  const showDialogForProduct = useShowDialogForProduct();

  const { isArb } = useIsChainType();
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const { data: allDepositableTokenBalances } =
    useAllDepositableTokenBalances();

  const harrisWinProductId = isArb
    ? KNOWN_PRODUCT_IDS.harrisWinArb
    : KNOWN_PRODUCT_IDS.harrisWinBase;
  const trumpWinProductId = isArb
    ? KNOWN_PRODUCT_IDS.trumpWinArb
    : KNOWN_PRODUCT_IDS.trumpWinBase;

  const executeRedeemElectionTokens = useExecuteRedeemElectionTokens();

  const { isLoading: isRedemptionLoading, isSuccess: isRedemptionSuccess } =
    useOnChainMutationStatus({
      mutationStatus: executeRedeemElectionTokens.status,
      txResponse: executeRedeemElectionTokens.data,
    });

  useRunWithDelayOnCondition({
    condition: isRedemptionSuccess,
    fn: executeRedeemElectionTokens.reset,
  });

  const harrisToken =
    allMarketsStaticData?.spot[harrisWinProductId].metadata.token;
  const trumpToken =
    allMarketsStaticData?.spot[trumpWinProductId].metadata.token;

  const walletBalances = useMemo(() => {
    if (!allDepositableTokenBalances || !trumpToken || !harrisToken) {
      return {};
    }

    return {
      harris: removeDecimals(
        allDepositableTokenBalances[harrisWinProductId],
        harrisToken.tokenDecimals,
      ),
      trump: removeDecimals(
        allDepositableTokenBalances[trumpWinProductId],
        trumpToken.tokenDecimals,
      ),
    };
  }, [
    allDepositableTokenBalances,
    harrisToken,
    harrisWinProductId,
    trumpToken,
    trumpWinProductId,
  ]);

  const buttonState = useMemo((): BaseActionButtonState => {
    if (isRedemptionLoading) {
      return 'loading';
    }
    if (isRedemptionSuccess) {
      return 'success';
    }
    if (walletBalances?.trump?.isZero() && walletBalances?.harris?.isZero()) {
      return 'disabled';
    }
    return 'idle';
  }, [
    isRedemptionLoading,
    isRedemptionSuccess,
    walletBalances?.harris,
    walletBalances?.trump,
  ]);

  const onRedeemClick = useCallback(() => {
    const txResponsePromise = executeRedeemElectionTokens.mutateAsync({});

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Redemption Failed',
        executionData: { txResponsePromise },
      },
    });
  }, [dispatchNotification, executeRedeemElectionTokens]);

  return (
    <>
      <div>
        <p className="pb-2 text-sm">
          You will need to{' '}
          <LinkButton
            colorVariant="accent"
            onClick={() => {
              showDialogForProduct({
                dialogType: 'withdraw',
                productId: harrisWinProductId,
              });
            }}
          >
            withdraw
          </LinkButton>{' '}
          your tokens from Vertex first.
        </p>
        <ValueWithLabel.Horizontal
          sizeVariant="sm"
          label={`${harrisToken?.symbol ?? ''} In Wallet`}
          value={walletBalances.harris}
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
          valueEndElement={harrisToken?.symbol}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="sm"
          label={`${trumpToken?.symbol ?? ''} In Wallet`}
          value={walletBalances.trump}
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
          valueEndElement={trumpToken?.symbol}
        />
      </div>
      <RedeemButton onClick={onRedeemClick} buttonState={buttonState} />
    </>
  );
}

function RedeemButton({
  onClick,
  buttonState,
}: {
  onClick: () => void;
  buttonState: BaseActionButtonState;
}) {
  const content = {
    loading: 'Confirm Transaction',
    success: <ButtonStateContent.Success message="Redeemed" />,
    idle: 'Redeem',
    disabled: 'Redeem',
  }[buttonState];

  return (
    <ValidUserStatePrimaryButton
      handledErrors={
        HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
      }
      onClick={onClick}
      disabled={buttonState === 'disabled'}
      isLoading={buttonState === 'loading'}
    >
      {content}
    </ValidUserStatePrimaryButton>
  );
}
