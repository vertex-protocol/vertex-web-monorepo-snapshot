import { Hex, isHex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

export function isPrivateKey(key: string): key is Hex {
  if (!isHex(key)) {
    return false;
  }
  try {
    // This call will throw if the key is not valid
    privateKeyToAccount(key);
    return true;
  } catch {
    return false;
  }
}
