import { PrimaryChainID } from '@vertex-protocol/react-client';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * Not all pages are accessible on all chains. This hook will replace the current route with the portfolio page
 * if the current primary chain is not supported by the page.
 */
export function useRedirectOnInvalidChain(enabledChainIds: PrimaryChainID[]) {
  const isEnabled = useIsEnabledForChainIds(enabledChainIds);
  const { replace } = useRouter();

  useEffect(() => {
    if (!isEnabled) {
      replace(ROUTES.portfolio.overview);
    }
  }, [isEnabled, replace]);
}
