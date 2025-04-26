import { XrpConnector } from 'client/context/xrp/connectors/types';
import { XummConnector } from 'client/context/xrp/connectors/xumm/useXummConnector';
import { createContext, use } from 'react';
import { SetRequired } from 'type-fest';

export interface XrpContextData {
  connectedConnector: SetRequired<XrpConnector, 'address'> | undefined;

  // Individual SDKs, this object should be a Record<XrpConnectorID, interface that satisfies XrpConnector>
  connectors: {
    xumm: XummConnector;
  };
}

export const XrpContext = createContext<XrpContextData>({} as XrpContextData);

export const useXrpContext = () => use(XrpContext);
