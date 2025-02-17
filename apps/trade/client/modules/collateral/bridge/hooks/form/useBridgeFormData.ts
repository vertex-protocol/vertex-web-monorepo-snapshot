import { removeDecimals } from '@vertex-protocol/utils';
import { useMinInitialDepositAmountByProductId } from 'client/hooks/subaccount/useMinInitialDepositAmountByProductId';
import { useBridgeTokenBalances } from 'client/modules/collateral/bridge/hooks/query/useBridgeTokenBalances';
import { useBridgeData } from 'client/modules/collateral/bridge/hooks/useBridgeData';
import { useMemo } from 'react';

interface Params {
  sourceChainId: number;
  sourceTokenAddress: string;
  destinationTokenAddress: string;
}

export function useBridgeFormData({
  sourceChainId,
  sourceTokenAddress,
  destinationTokenAddress,
}: Params) {
  const { destinationChain, sourceChains } = useBridgeData() ?? {};
  const { data: tokenBalancesForSourceChain } =
    useBridgeTokenBalances(sourceChainId);
  const { data: minInitialDepositAmounts } =
    useMinInitialDepositAmountByProductId();

  // Source
  const allSourceChains = useMemo(() => {
    return Object.values(sourceChains ?? []);
  }, [sourceChains]);

  const selectedSourceChain = useMemo(() => {
    if (!sourceChainId) {
      return;
    }

    return sourceChains?.[sourceChainId];
  }, [sourceChainId, sourceChains]);

  const allSourceTokens = useMemo(() => {
    return selectedSourceChain?.tokens ?? [];
  }, [selectedSourceChain?.tokens]);

  const selectedSourceToken = useMemo(() => {
    if (!sourceTokenAddress || !selectedSourceChain) {
      return;
    }

    return selectedSourceChain.tokens.find(
      (token) => token.address === sourceTokenAddress,
    );
  }, [selectedSourceChain, sourceTokenAddress]);

  const sourceTokenBalance = useMemo(() => {
    if (!tokenBalancesForSourceChain || !selectedSourceToken) {
      return;
    }
    const balance = tokenBalancesForSourceChain[selectedSourceToken.address];
    if (!balance) {
      return;
    }

    return removeDecimals(balance, selectedSourceToken.tokenDecimals);
  }, [selectedSourceToken, tokenBalancesForSourceChain]);

  const allDestinationTokens = useMemo(() => {
    return (
      destinationChain?.tokens?.filter((token) => {
        // When the source matches the destination, we want to filter out the source token. ie) prevent cases where swap/bridge need not occur
        const isSameDestinationToken =
          token.chainId === sourceChainId &&
          token.address.toLowerCase() === sourceTokenAddress.toLowerCase();
        return !isSameDestinationToken;
      }) ?? []
    );
  }, [destinationChain, sourceChainId, sourceTokenAddress]);

  const selectedDestinationToken = useMemo(() => {
    if (!destinationTokenAddress) {
      return;
    }

    return allDestinationTokens.find(
      (token) => token.address === destinationTokenAddress,
    );
  }, [allDestinationTokens, destinationTokenAddress]);

  const minimumInitialDepositAmount = useMemo(() => {
    if (!minInitialDepositAmounts || !selectedDestinationToken) {
      return;
    }

    return minInitialDepositAmounts[
      selectedDestinationToken.vertexProduct.productId
    ];
  }, [minInitialDepositAmounts, selectedDestinationToken]);

  return {
    allSourceChains,
    allSourceTokens,
    selectedSourceChain,
    selectedSourceToken,
    sourceTokenBalance,
    allDestinationTokens,
    selectedDestinationToken,
    minimumInitialDepositAmount,
  };
}
