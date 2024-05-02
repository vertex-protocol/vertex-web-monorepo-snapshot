import { calcLpTokenValue } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useLpYields } from 'client/hooks/markets/useLpYields';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useAccountLbaState } from 'client/hooks/query/vrtxToken/useAccountLbaState';
import { useAccountTokenClaimState } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
import {
  LpBalanceItem,
  useLpBalances,
} from 'client/hooks/subaccount/useLpBalances';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { AnnotatedSpotMarket, Token } from 'common/productMetadata/types';
import { useMemo } from 'react';

interface UseVrtxPoolCard {
  lbaTokens: {
    primaryQuoteToken: Token;
    protocolToken: Token;
  };
  pool: {
    apr: BigDecimal | undefined;
    tvlUsd: BigDecimal | undefined;
  };
  lpBalance: LpBalanceItem | undefined;
  lbaPosition: {
    vrtxRewards: BigDecimal | undefined;
    lpValueUsd: BigDecimal | undefined;
  };
  disableProvide: boolean;
  onProvideLiquidityClick: () => void;
  disableWithdraw: boolean;
  onWithdrawLiquidityClick: () => void;
}

export function useVrtxPoolCard(): UseVrtxPoolCard {
  const { primaryQuoteToken, protocolToken, protocolTokenProductId } =
    useVertexMetadataContext();
  const showDialogForProduct = useShowDialogForProduct();

  const quotePriceUsd = useQuotePriceUsd();
  const userActionState = useUserActionState();

  const { data: accountTokenClaimState } = useAccountTokenClaimState();
  const { data: accountLbaState } = useAccountLbaState();

  const { data: vrtxSpotMarket } = useMarket<AnnotatedSpotMarket>({
    productId: protocolTokenProductId,
  });
  const { data: lpYields } = useLpYields();
  // Data here is decimal adjusted
  const { balances: lpBalances } = useLpBalances();

  const vrtxPoolApr = lpYields?.[protocolTokenProductId];

  const lpBalance = useMemo(() => {
    return lpBalances?.find(
      (balance) => balance.productId === protocolTokenProductId,
    );
  }, [lpBalances, protocolTokenProductId]);

  const lpTokenValueUsd = useMemo(() => {
    if (!vrtxSpotMarket) {
      return;
    }
    return calcLpTokenValue(vrtxSpotMarket.product).multipliedBy(quotePriceUsd);
  }, [quotePriceUsd, vrtxSpotMarket]);

  const tvlUsd = useMemo(() => {
    if (!vrtxSpotMarket || !lpTokenValueUsd) {
      return;
    }
    return removeDecimals(
      lpTokenValueUsd.multipliedBy(vrtxSpotMarket.product.totalLpSupply),
    );
  }, [lpTokenValueUsd, vrtxSpotMarket]);

  const lbaLpValueUsd = useMemo(() => {
    if (!accountLbaState || !lpTokenValueUsd) {
      return;
    }
    const totalLpBalance = accountLbaState.lockedLpBalance.plus(
      accountLbaState.withdrawableLpBalance,
    );

    return removeDecimals(
      totalLpBalance.multipliedBy(lpTokenValueUsd),
      protocolToken.tokenDecimals,
    );
  }, [accountLbaState, lpTokenValueUsd, protocolToken.tokenDecimals]);

  const onProvideLiquidityClick = () => {
    showDialogForProduct({
      dialogType: 'provide_liquidity',
      productId: protocolTokenProductId,
    });
  };

  const onWithdrawLiquidityClick = () => {
    showDialogForProduct({
      dialogType: 'withdraw_liquidity',
      productId: protocolTokenProductId,
    });
  };

  return {
    lbaTokens: {
      primaryQuoteToken,
      protocolToken,
    },
    lpBalance,
    pool: {
      apr: vrtxPoolApr,
      tvlUsd,
    },
    lbaPosition: {
      vrtxRewards: removeDecimals(
        accountTokenClaimState?.claimableLbaRewards,
        protocolToken.tokenDecimals,
      ),
      lpValueUsd: lbaLpValueUsd,
    },
    disableProvide: userActionState !== 'allow_all',
    onProvideLiquidityClick,
    disableWithdraw:
      userActionState === 'block_all' ||
      !lpBalance ||
      lpBalance.lpAmount.isZero(),
    onWithdrawLiquidityClick,
  };
}
