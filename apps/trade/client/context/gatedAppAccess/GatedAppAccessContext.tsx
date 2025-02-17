import { WithChildren } from '@vertex-protocol/web-common';
import { useCloudflareRedirect } from 'client/context/gatedAppAccess/hooks/useCloudflareRedirect';
import { useGeolocationBlock } from 'client/context/gatedAppAccess/hooks/useGeolocationBlock';
import { createContext, use, useMemo } from 'react';

export type GatedAppAccessWrapperContextData = {
  isBlockedGeolocation: boolean;
};

const GatedAppAccessContext = createContext<GatedAppAccessWrapperContextData>(
  {} as GatedAppAccessWrapperContextData,
);

export const useGatedAppAccessContext = () => use(GatedAppAccessContext);

export function GatedAppAccessContextProvider({ children }: WithChildren) {
  const { isBlockedGeolocation } = useGeolocationBlock();
  useCloudflareRedirect();

  const contextValue = useMemo(() => {
    return {
      isBlockedGeolocation,
    };
  }, [isBlockedGeolocation]);

  return (
    <GatedAppAccessContext value={contextValue}>
      {children}
    </GatedAppAccessContext>
  );
}
