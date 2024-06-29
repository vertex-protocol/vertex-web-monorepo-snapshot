import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useLatestMarketPrice } from 'client/hooks/markets/useLatestMarketPrice';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useStakingState } from 'client/hooks/query/vrtxToken/useStakingState';
import { useVrtxTokenSupply } from 'client/hooks/query/vrtxToken/useVrtxTokenSupply';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { AnnotatedSpotMarket, Token } from 'common/productMetadata/types';

interface UseVrtxMarketCard {
  tokens: {
    primaryQuoteToken: Token;
    protocolToken: Token;
  };
  pastDayVolumeQuote: BigDecimal | undefined;
  currentPrice: BigDecimal | undefined;
  pastDayPriceChangeFrac: BigDecimal | undefined;
  marketCapUsd: BigDecimal | undefined;
  liquidTokenSupply: BigDecimal | undefined;
  percentStaked: BigDecimal | undefined;
  marketPriceFormatSpecifier: string;
  onTradeClick: () => void;
}

export function useVrtxMarketCard(): UseVrtxMarketCard {
  const { primaryQuoteToken, protocolTokenMetadata } =
    useVertexMetadataContext();
  const pushTradePage = usePushTradePage();

  const quotePriceUsd = usePrimaryQuotePriceUsd();

  // Vertex market
  const { data: vrtxSpotMarket } = useMarket<AnnotatedSpotMarket>({
    productId: protocolTokenMetadata.productId,
  });
  const { data: allMarketsHistoricalMetrics } =
    useAllMarketsHistoricalMetrics();
  const { data: latestVrtxMarketPrice } = useLatestMarketPrice({
    productId: protocolTokenMetadata.productId,
  });

  // Vertex token
  const { data: vrtxTokenSupply } = useVrtxTokenSupply();
  const { data: stakingState } = useStakingState();

  const historicalMetrics =
    allMarketsHistoricalMetrics?.metricsByMarket?.[
      protocolTokenMetadata.productId
    ];

  const liquidTokenSupply = vrtxTokenSupply?.liquidSupply;
  const marketCap = vrtxSpotMarket
    ? liquidTokenSupply?.multipliedBy(vrtxSpotMarket.product.oraclePrice)
    : undefined;

  const totalStaked = removeDecimals(
    stakingState?.totalStaked,
    protocolTokenMetadata.token.tokenDecimals,
  );
  const percentStaked = liquidTokenSupply
    ? totalStaked?.div(liquidTokenSupply)
    : undefined;

  const onTradeClick = () => {
    pushTradePage({
      productId: protocolTokenMetadata.productId,
    });
  };

  return {
    tokens: {
      primaryQuoteToken,
      protocolToken: protocolTokenMetadata.token,
    },
    marketPriceFormatSpecifier: getMarketPriceFormatSpecifier(
      vrtxSpotMarket?.priceIncrement,
    ),
    currentPrice: latestVrtxMarketPrice?.safeAverage,
    liquidTokenSupply: liquidTokenSupply,
    marketCapUsd: marketCap?.multipliedBy(quotePriceUsd),
    pastDayPriceChangeFrac: historicalMetrics?.pastDayPriceChangeFrac,
    pastDayVolumeQuote: removeDecimals(
      historicalMetrics?.pastDayVolumeInPrimaryQuote,
    ),
    percentStaked,
    onTradeClick,
  };
}
