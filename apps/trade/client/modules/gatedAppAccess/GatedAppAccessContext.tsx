import { WithChildren } from '@vertex-protocol/web-common';
import { createContext, useContext, useMemo } from 'react';
import { useCloudflareRedirect } from 'client/modules/gatedAppAccess/hooks/useCloudflareRedirect';
import { useGeolocationBlock } from 'client/modules/gatedAppAccess/hooks/useGeolocationBlock';

export type GatedAppAccessWrapperContextData = {
  isBlockedGeolocation: boolean;
};

const GatedAppAccessContext = createContext<GatedAppAccessWrapperContextData>(
  {} as GatedAppAccessWrapperContextData,
);

export const useGatedAppAccessContext = () => useContext(GatedAppAccessContext);

export function GatedAppAccessContextProvider({ children }: WithChildren) {
  const { isBlockedGeolocation } = useGeolocationBlock();
  useCloudflareRedirect();

  const contextValue = useMemo(() => {
    return {
      isBlockedGeolocation,
    };
  }, [isBlockedGeolocation]);

  return (
    <GatedAppAccessContext.Provider value={contextValue}>
      {children}
    </GatedAppAccessContext.Provider>
  );
}
