import {
  ConnectedXrpConnector,
  XrpConnector,
} from 'client/context/xrp/connectors/types';

export function isConnectedXrpConnector(
  connector: XrpConnector,
): connector is ConnectedXrpConnector {
  return !!connector.address;
}
