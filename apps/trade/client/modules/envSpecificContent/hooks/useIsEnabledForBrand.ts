import { BrandName } from '@vertex-protocol/web-ui';
import { clientEnv } from 'common/environment/clientEnv';
import { useMemo } from 'react';

export function useIsEnabledForBrand(enabledBrands: BrandName[]) {
  return useMemo(() => {
    return enabledBrands.some((brand) => brand === clientEnv.base.brandName);
    // Disabling since we don't want to force consumers to use a static constant for visibleBrands
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
