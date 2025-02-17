import { CollateralSpotProductSelectValue } from 'client/modules/collateral/types';
import { bigDecimalComparator } from 'client/utils/comparators';

export function sortByDisplayedAssetValue(
  a: CollateralSpotProductSelectValue,
  b: CollateralSpotProductSelectValue,
) {
  return bigDecimalComparator(
    b.displayedAssetValueUsd,
    a.displayedAssetValueUsd,
  );
}
