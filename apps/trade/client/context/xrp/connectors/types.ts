import { SetRequired } from 'type-fest';
import { Hex } from 'viem';

/**
 * Known XRP connector IDs
 */
export type XrpConnectorID = 'xumm';

/**
 * Common properties for a XRP connector
 */
export interface XrpConnector<
  TConnectorID extends XrpConnectorID = XrpConnectorID,
> {
  /**
   * The ID of the connector
   */
  id: TConnectorID;
  /**
   * If defined, the connected wallet address
   * Note: this needs `?:` instead of `| undefined` so that `SetRequired` in `XrpContext` works
   */
  address?: string;

  connect(): Promise<void>;

  disconnect(): Promise<void>;

  /**
   * A signed authorization to derive the linked signer private key. This is typically the signature resulting from an
   * empty AccountSet transaction
   */
  getLinkedSignerAuthorization(): Promise<Hex>;
}

export type ConnectedXrpConnector<
  TConnectorID extends XrpConnectorID = XrpConnectorID,
> = SetRequired<XrpConnector<TConnectorID>, 'address'>;
