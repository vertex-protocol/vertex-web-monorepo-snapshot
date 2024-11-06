import { ProductEngineType } from '@vertex-protocol/client';
import { BigDecimal } from '@vertex-protocol/utils';
import { getMarketSizeFormatSpecifier } from '@vertex-protocol/react-client';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { usePerpPositions } from 'client/hooks/subaccount/usePerpPositions';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { MarketCategory } from '@vertex-protocol/metadata';
import { TokenIconMetadata } from '@vertex-protocol/metadata';
import { useMemo } from 'react';
import { useIsConnected } from 'client/hooks/util/useIsConnected';

export interface PositionsTableItem {
  productId: number;
  marketInfo: {
    marketName: string;
    icon: TokenIconMetadata;
    amountForSide: BigDecimal;
    productType: ProductEngineType;
  };
  amountInfo: {
    symbol: string;
    position: BigDecimal;
    notionalValueUsd: BigDecimal;
  };
  pnlInfo: {
    estimatedPnlUsd: BigDecimal;
    estimatedPnlFrac: BigDecimal;
  };
  sizeFormatSpecifier: string;
  searchKey: string;
  actionText: string;
  action: () => void;
  type: 'positions';
}

interface Params {
  marketCategory: MarketCategory | undefined;
}

export const useCommandCenterPositionsItems = ({ marketCategory }: Params) => {
  const { data: perpBalances } = usePerpPositions();
  const { data: staticMarketsData } = useAllMarketsStaticData();

  const { show } = useDialog();
  const pushTradePage = usePushTradePage();

  const isConnected = useIsConnected();
  const isCloseDisabled = !isConnected;

  const mappedData: PositionsTableItem[] = useMemo(() => {
    if (!perpBalances) {
      return [];
    }

    return perpBalances
      .filter((balance) => {
        const isMatchingCategory =
          marketCategory == null ||
          balance.metadata.marketCategories.has(marketCategory);
        const isNonZeroBalance = !balance.amount.isZero();

        return isMatchingCategory && isNonZeroBalance;
      })
      .map((position): PositionsTableItem => {
        const staticMarketData = staticMarketsData?.perp[position.productId];

        const action = (() => {
          // If close is disabled we push to the market page instead.
          if (isCloseDisabled) {
            return () => pushTradePage({ productId: position.productId });
          }

          return () =>
            show({
              type: 'close_position',
              params: { productId: position.productId },
            });
        })();

        return {
          marketInfo: {
            marketName: position.metadata.marketName,
            icon: position.metadata.icon,
            amountForSide: position.amount,
            productType: ProductEngineType.PERP,
          },
          amountInfo: {
            symbol: position.metadata.symbol,
            position: position.amount,
            notionalValueUsd: position.notionalValueUsd,
          },
          pnlInfo: {
            estimatedPnlUsd: position.estimatedPnlUsd,
            estimatedPnlFrac: position.estimatedPnlFrac,
          },
          sizeFormatSpecifier: getMarketSizeFormatSpecifier(
            staticMarketData?.sizeIncrement,
          ),
          productId: position.productId,
          searchKey: position.metadata.marketName,
          actionText: isCloseDisabled ? 'Go to page' : 'Close',
          action,
          type: 'positions',
        };
      });
  }, [
    perpBalances,
    staticMarketsData?.perp,
    marketCategory,
    isCloseDisabled,
    show,
    pushTradePage,
  ]);

  return { positions: mappedData };
};
