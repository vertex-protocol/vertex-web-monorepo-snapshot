import {
  GetEngineIsolatedPositionsResponse,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/client';
import {
  AnnotatedIsolatedPositionWithProduct,
  PerpProductMetadata,
  SpotProductMetadata,
} from '@vertex-protocol/react-client';
import { sortBy } from 'lodash';

interface Params {
  isolatedPositions: GetEngineIsolatedPositionsResponse;
  getSpotMetadata: (productId: number) => SpotProductMetadata | undefined;
  getPerpMetadata: (productId: number) => PerpProductMetadata | undefined;
}

export function annotateIsolatedPositions({
  isolatedPositions,
  getSpotMetadata,
  getPerpMetadata,
}: Params) {
  const positions: AnnotatedIsolatedPositionWithProduct[] = [];
  const primaryQuoteMetadata = getSpotMetadata(QUOTE_PRODUCT_ID);

  if (!primaryQuoteMetadata) {
    return positions;
  }

  // Sort by ascending product ID, similarly to subaccount summary
  sortBy(isolatedPositions, 'productId').forEach((position) => {
    const perpMetadata = getPerpMetadata(position.baseBalance.productId);

    if (!perpMetadata) {
      return;
    }

    positions.push({
      baseBalance: {
        ...position.baseBalance,
        metadata: perpMetadata,
      },
      quoteBalance: {
        ...position.quoteBalance,
        metadata: primaryQuoteMetadata,
      },
      subaccount: position.subaccount,
      healths: position.healths,
    });
  });

  return positions;
}
