import { UserRejectedRequestError } from 'viem';

/**
 * Checks if the error is the result of user rejecting the transaction
 */
export function isUserDeniedError(err?: any): boolean {
  // Viem wraps RPC errors under a `cause` property, check that first
  // This condition is hit if we call `useWriteContract`
  if (err?.['cause'] instanceof UserRejectedRequestError) {
    return true;
  }
  
  // Provider errors usually have a `code` property, this is hit if we use contract methods through the SDK
  if (!err?.code) {
    return false;
  }

  // ACTION_REJECTED occurs on desktop MetaMask, 4001 occurs with walletconnect on mobile: https://github.com/MetaMask/rpc-errors/blob/main/src/error-constants.ts
  return err.code === 'ACTION_REJECTED' || err.code === 4001;
}
