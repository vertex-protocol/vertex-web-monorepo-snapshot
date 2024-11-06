'use client';

import { PrimaryChainID } from '@vertex-protocol/react-client';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  validChainIds: PrimaryChainID[];
}

/**
 * Not all pages are accessible on all chains. This will replace the current route with the portfolio page
 * if the current primary chain is not supported by the page.
 */
export function RedirectOnInvalidChainEnvListener({ validChainIds }: Props) {
  const isEnabled = useIsEnabledForChainIds(validChainIds);
  const { replace } = useRouter();

  useEffect(() => {
    if (!isEnabled) {
      replace(ROUTES.portfolio.overview);
    }
  }, [isEnabled, replace]);

  return null;
}
