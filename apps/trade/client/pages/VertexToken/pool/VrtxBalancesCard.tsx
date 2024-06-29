import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useLbaTokenWalletBalances } from 'client/hooks/query/vrtxToken/useLbaTokenWalletBalances';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { useMemo } from 'react';

export function VrtxBalancesCard() {
  const showDialogForProduct = useShowDialogForProduct();
  const userActionState = useUserActionState();
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { data: lbaTokenWalletBalances } = useLbaTokenWalletBalances();
  const { balances } = useSpotBalances();

  const { decimalAdjustedSpotBalance, decimalAdjustedWalletBalance } =
    useMemo(() => {
      const vrtxSpotBalance = balances?.find(
        (balance) => balance.productId === protocolTokenMetadata.productId,
      );

      return {
        decimalAdjustedSpotBalance: vrtxSpotBalance?.amount,
        decimalAdjustedWalletBalance: removeDecimals(
          lbaTokenWalletBalances?.vrtx.balanceAmount,
          protocolTokenMetadata.token.tokenDecimals,
        ),
      };
    }, [
      balances,
      lbaTokenWalletBalances,
      protocolTokenMetadata.token.tokenDecimals,
      protocolTokenMetadata.productId,
    ]);

  const onDepositVrtxClick = () => {
    showDialogForProduct({
      dialogType: 'deposit',
      productId: protocolTokenMetadata.productId,
    });
  };
  const onWithdrawVrtxClick = () => {
    showDialogForProduct({
      dialogType: 'withdraw',
      productId: protocolTokenMetadata.productId,
    });
  };

  return (
    <RewardsCard.Container className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      <ValueWithLabel.Vertical
        label="VRTX Balance"
        value={decimalAdjustedSpotBalance}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        valueEndElement={VRTX_TOKEN_INFO.symbol}
      />
      <ValueWithLabel.Vertical
        label="VRTX in Wallet"
        value={decimalAdjustedWalletBalance}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        valueEndElement={VRTX_TOKEN_INFO.symbol}
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
