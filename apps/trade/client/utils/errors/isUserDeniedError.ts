/**
 * Not sure if this is bulletproof, but it's a start
 */
export function isUserDeniedError(err?: any): boolean {
  // Provider errors usually have a `code` property
  if (!err?.code) {
    return false;
  }

  // ACTION_REJECTED occurs on desktop MetaMask, 4001 occurs with walletconnect on mobile: https://github.com/MetaMask/rpc-errors/blob/main/src/error-constants.ts
  return err.code === 'ACTION_REJECTED' || err.code === 4001;
}
