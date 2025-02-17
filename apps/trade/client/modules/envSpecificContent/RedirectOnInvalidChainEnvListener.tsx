'use client';

import { ChainEnv } from '@vertex-protocol/client';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useIsEnabledForChainEnvs } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainEnvs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  // If provided, the page will redirect to the portfolio page if the chain env IS NOT in this list
  validChainEnvs?: ChainEnv[];
  // If provided, the page will redirect to the portfolio page if the chain env IS in this list
  invalidChainEnvs?: ChainEnv[];
}

/**
 * Not all pages are accessible on all chains. This will replace the current route with the portfolio page
 * if the current chain env is not supported by the page.
 */
export function RedirectOnInvalidChainEnvListener({
  validChainEnvs = [],
  invalidChainEnvs = [],
}: Props) {
  const hasValidChainIds = validChainEnvs.length;
  const isEnabled = useIsEnabledForChainEnvs(validChainEnvs);
  const hasInvalidChainIds = invalidChainEnvs.length;
  const isDisabled = useIsEnabledForChainEnvs(invalidChainEnvs);
  const { replace } = useRouter();

  useEffect(() => {
    if (
      (hasValidChainIds && !isEnabled) ||
      (hasInvalidChainIds && isDisabled)
    ) {
      replace(ROUTES.portfolio.overview);
    }
  }, [isEnabled, isDisabled, replace, hasValidChainIds, hasInvalidChainIds]);

  return null;
}
