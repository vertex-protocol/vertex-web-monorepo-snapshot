import { Hex } from 'viem';

export interface CreateXrpLinkedSignerParams {
  /**
   * Signed hex of an empty AccountSet transaction
   */
  signedAuthorization: Hex;
}

export interface CreateXrpLinkedSignerResponse {
  linkedSignerPrivateKey: Hex;
}
