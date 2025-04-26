import { WithChildren } from '@vertex-protocol/web-common';
import { useIsEnabledForBrand } from 'client/modules/envSpecificContent/hooks/useIsEnabledForBrand';
import { BrandName } from 'common/environment/types';

interface Props extends WithChildren {
  enabledBrands: BrandName[];
}

export function BrandSpecificContent({ children, enabledBrands }: Props) {
  const isContentVisible = useIsEnabledForBrand(enabledBrands);

  if (!isContentVisible) {
    return null;
  }

  return <>{children}</>;
}
