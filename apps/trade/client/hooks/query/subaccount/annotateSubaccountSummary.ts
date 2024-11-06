import {
  ProductEngineType,
  SubaccountSummaryResponse,
} from '@vertex-protocol/contracts';
import {
  AnnotatedBalanceWithProduct,
  PerpProductMetadata,
  SpotProductMetadata,
} from '@vertex-protocol/metadata';
import { sortBy } from 'lodash';

// Annotated balances that include metadata
export type AnnotatedSubaccountSummary = Omit<
  SubaccountSummaryResponse,
  'balances'
> & {
  balances: AnnotatedBalanceWithProduct[];
};

interface Params {
  summary: SubaccountSummaryResponse;
  getSpotMetadata: (productId: number) => SpotProductMetadata | undefined;
  getPerpMetadata: (productId: number) => PerpProductMetadata | undefined;
}

export function annotateSubaccountSummary({
  summary,
  getSpotMetadata,
  getPerpMetadata,
}: Params): AnnotatedSubaccountSummary {
  // Map the data to annotated balances
  const balances: AnnotatedBalanceWithProduct[] = [];
  // Sort by ascending product ID
  sortBy(summary.balances, 'productId').forEach((balance) => {
    if (balance.type === ProductEngineType.SPOT) {
      const metadata = getSpotMetadata(balance.productId);
      if (!metadata) {
        return;
      }

      balances.push({
        ...balance,
        metadata,
      });
    } else if (balance.type === ProductEngineType.PERP) {
      const metadata = getPerpMetadata(balance.productId);
      if (!metadata) {
        return;
      }

      balances.push({
        ...balance,
        metadata,
      });
    }
  });

  return {
    exists: summary.exists,
    health: summary.health,
    balances,
  };
}
