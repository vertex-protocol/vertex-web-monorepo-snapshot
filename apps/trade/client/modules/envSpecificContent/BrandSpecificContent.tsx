import { WithChildren } from '@vertex-protocol/web-common';
import { BrandName } from '@vertex-protocol/web-ui';
import { useIsEnabledForBrand } from 'client/modules/envSpecificContent/hooks/useIsEnabledForBrand';

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
