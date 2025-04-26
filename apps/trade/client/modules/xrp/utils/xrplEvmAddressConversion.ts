import { Address, toHex } from 'viem';
import { decodeAccountID, encodeAccountID } from 'xrpl';

/*
 * Conversions from: https://docs.xrplevm.org/pages/developers/making-a-cross-chain-dapp/send-tokens#converting-needed-for-xrplevm-to-xrpl-transfers
 */

/**
 * Convert an XRP address to an EVM address.
 * @param xrpAddress
 */
export function xrpToEvmAddress(xrpAddress: string): Address {
  const accountIDBytes = decodeAccountID(xrpAddress); // returns a 20-byte Buffer
  return toHex(accountIDBytes);
}

/**
 * Convert an EVM address to an XRP address.
 * @param evmAddress
 */
export function evmToXrpAddress(evmAddress: Address): string {
  // Suppose evmAddress = "0xcdaa5ba0215e9359fa62cb5a5650a17b362817ac"
  const addressExcluding0x = evmAddress.slice(2);
  const accountIDBytes = Uint8Array.from(
    Buffer.from(addressExcluding0x, 'hex'),
  );

  // Encode as an XRP classic address
  return encodeAccountID(accountIDBytes); // e.g. "rLZ1..."
}
