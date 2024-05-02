import { CollateralSpotProduct } from 'client/modules/collateral/types';
import { bigDecimalComparator } from 'client/utils/comparators';

export function sortByDisplayedAssetValue(
  a: CollateralSpotProduct,
  b: CollateralSpotProduct,
) {
  return bigDecimalComparator(
    b.displayedAssetValueUsd,
    a.displayedAssetValueUsd,
  );
}
