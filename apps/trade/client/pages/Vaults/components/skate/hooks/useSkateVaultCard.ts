import { removeDecimals } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSkateOllies } from 'client/modules/vaults/hooks/query/useSkateOllies';
import { useSkateVaultApyFraction } from 'client/modules/vaults/hooks/query/useSkateVaultApyFraction';
import { useSkateVaultState } from 'client/modules/vaults/hooks/query/useSkateVaultState';
import { useMemo } from 'react';
import { Address } from 'viem';

export function useSkateVaultCard({ vaultAddress }: { vaultAddress: Address }) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { data: skateVaultState } = useSkateVaultState({ vaultAddress });
  const { data: vaultApy } = useSkateVaultApyFraction({
    vaultAddress,
  });
  const { data: skateOllies } = useSkateOllies();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const quoteDecimals = primaryQuoteToken.tokenDecimals;

  return useMemo(() => {
    return {
      decimalAdjustedUserShares: removeDecimals(skateVaultState?.userShares),
      decimalAdjustedUserBalanceUsd: removeDecimals(
        skateVaultState?.userUnderlyingQuoteBalance.multipliedBy(
          primaryQuotePriceUsd,
        ),
        quoteDecimals,
      ),
      decimalAdjustedVaultTvlUsd: removeDecimals(
        skateVaultState?.totalVaultUnderlyingQuoteBalance.multipliedBy(
          primaryQuotePriceUsd,
        ),
        quoteDecimals,
      ),
      skateOllies,
      vaultApy,
    };
  }, [
    skateVaultState?.userShares,
    skateVaultState?.userUnderlyingQuoteBalance,
    skateVaultState?.totalVaultUnderlyingQuoteBalance,
    primaryQuotePriceUsd,
    quoteDecimals,
    skateOllies,
    vaultApy,
  ]);
}
