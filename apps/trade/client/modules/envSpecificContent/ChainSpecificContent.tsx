import { PrimaryChainID } from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';

interface Props extends WithChildren {
  enabledChainIds: PrimaryChainID[];
}

export function ChainSpecificContent({ children, enabledChainIds }: Props) {
  const isContentVisible = useIsEnabledForChainIds(enabledChainIds);

  if (!isContentVisible) {
    return null;
  }

  return <>{children}</>;
}
