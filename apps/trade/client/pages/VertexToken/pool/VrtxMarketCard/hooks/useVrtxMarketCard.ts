import { BigDecimal } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useLatestMarketPrice } from 'client/hooks/markets/useLatestMarketPrice';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useStakingState } from 'client/hooks/query/vrtxToken/useStakingState';
import { useVrtxTokenSupply } from 'client/hooks/query/vrtxToken/useVrtxTokenSupply';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
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
  const { primaryQuoteToken, protocolToken, protocolTokenProductId } =
    useVertexMetadataContext();
  const pushTradePage = usePushTradePage();

  const quotePriceUsd = useQuotePriceUsd();

  // Vertex market
  const { data: vrtxSpotMarket } = useMarket<AnnotatedSpotMarket>({
    productId: protocolTokenProductId,
  });
  const { data: allMarketsHistoricalMetrics } =
    useAllMarketsHistoricalMetrics();
  const { data: latestVrtxMarketPrice } = useLatestMarketPrice({
    productId: protocolTokenProductId,
  });

  // Vertex token
  const { data: vrtxTokenSupply } = useVrtxTokenSupply();
  const { data: stakingState } = useStakingState();

  const historicalMetrics =
    allMarketsHistoricalMetrics?.metricsByMarket?.[protocolTokenProductId];

  const liquidTokenSupply = removeDecimals(
    vrtxTokenSupply?.liquidSupply,
    protocolToken.tokenDecimals,
  );
  const marketCap = vrtxSpotMarket
    ? liquidTokenSupply?.multipliedBy(vrtxSpotMarket.product.oraclePrice)
    : undefined;
  const fdv = vrtxSpotMarket
    ? removeDecimals(
        vrtxTokenSupply?.totalSupply,
        protocolToken.tokenDecimals,
      )?.multipliedBy(vrtxSpotMarket.product.oraclePrice)
    : undefined;

  const totalStaked = removeDecimals(
    stakingState?.totalStaked,
    protocolToken.tokenDecimals,
  );
  const percentStaked = liquidTokenSupply
    ? totalStaked?.div(liquidTokenSupply)
    : undefined;

  const onTradeClick = () => {
    pushTradePage({
      productId: protocolTokenProductId,
    });
  };

  return {
    tokens: {
      primaryQuoteToken,
      protocolToken,
    },
    marketPriceFormatSpecifier: getMarketPriceFormatSpecifier(
      vrtxSpotMarket?.priceIncrement,
    ),
    currentPrice: latestVrtxMarketPrice?.safeAverage,
    liquidTokenSupply: liquidTokenSupply,
    marketCapUsd: marketCap?.multipliedBy(quotePriceUsd),
    pastDayPriceChangeFrac: historicalMetrics?.pastDayPriceChangeFrac,
    pastDayVolumeQuote: removeDecimals(historicalMetrics?.pastDayVolumeQuote),
    percentStaked,
    onTradeClick,
  };
}
