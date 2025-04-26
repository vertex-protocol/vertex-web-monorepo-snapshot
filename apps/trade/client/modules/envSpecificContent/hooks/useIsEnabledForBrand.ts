import { clientEnv } from 'common/environment/clientEnv';
import { BrandName } from 'common/environment/types';
import { useMemo } from 'react';

export function useIsEnabledForBrand(enabledBrands: BrandName[]) {
  return useMemo(() => {
    return enabledBrands.includes(clientEnv.base.brandName);
    // Disabling since we don't want to force consumers to use a static constant for visibleBrands
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
