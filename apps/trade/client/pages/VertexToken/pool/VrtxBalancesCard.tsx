import { SecondaryButton } from '@vertex-protocol/web-ui';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useLbaTokenWalletBalances } from 'client/hooks/query/vrtxToken/useLbaTokenWalletBalances';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { CustomNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { useMemo } from 'react';

export function VrtxBalancesCard() {
  const showDialogForProduct = useShowDialogForProduct();
  const userActionState = useUserActionState();
  const { protocolToken, protocolTokenProductId } = useVertexMetadataContext();
  const { data: lbaTokenWalletBalances } = useLbaTokenWalletBalances();
  const { balances } = useSpotBalances();

  const { decimalAdjustedSpotBalance, decimalAdjustedWalletBalance } =
    useMemo(() => {
      const vrtxSpotBalance = balances?.find(
        (balance) => balance.productId === protocolTokenProductId,
      );

      return {
        decimalAdjustedSpotBalance: vrtxSpotBalance?.amount,
        decimalAdjustedWalletBalance: removeDecimals(
          lbaTokenWalletBalances?.vrtx.balanceAmount,
          protocolToken.tokenDecimals,
        ),
      };
    }, [
      balances,
      lbaTokenWalletBalances,
      protocolToken.tokenDecimals,
      protocolTokenProductId,
    ]);

  const onDepositVrtxClick = () => {
    showDialogForProduct({
      dialogType: 'deposit',
      productId: protocolTokenProductId,
    });
  };
  const onWithdrawVrtxClick = () => {
    showDialogForProduct({
      dialogType: 'withdraw',
      productId: protocolTokenProductId,
    });
  };

  return (
    <RewardsCard.Container className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      <RewardsCard.MetricStackedItem
        label="VRTX Balance"
        value={decimalAdjustedSpotBalance}
        formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        symbol={VRTX_TOKEN_INFO.symbol}
      />
      <RewardsCard.MetricStackedItem
        label="VRTX in Wallet"
        value={decimalAdjustedWalletBalance}
        formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        symbol={VRTX_TOKEN_INFO.symbol}
      />
      <div className="col-span-2 flex items-center gap-x-3">
        <SecondaryButton
          size="lg"
          onClick={onDepositVrtxClick}
          className="flex-1"
          disabled={userActionState === 'block_all'}
        >
          Deposit VRTX
        </SecondaryButton>
        <SecondaryButton
          size="lg"
          onClick={onWithdrawVrtxClick}
          className="flex-1"
          disabled={userActionState !== 'allow_all'}
        >
          Withdraw VRTX
        </SecondaryButton>
      </div>
    </RewardsCard.Container>
  );
}
