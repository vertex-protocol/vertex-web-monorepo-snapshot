import { UserRejectedRequestError } from 'viem';

/**
 * Checks if the error is the result of user rejecting the transaction
 */
export function isUserDeniedError(err?: any): boolean {
  if (
    // Viem wraps RPC errors under a `cause` property,
    // this condition is hit if we call `useWriteContract`.
    err?.cause instanceof UserRejectedRequestError ||
    // Wagmi clients returned from `useWalletClient` / `usePublicClient`
    // wrap under a nested `cause.cause`.
    err?.cause?.cause instanceof UserRejectedRequestError
  ) {
    return true;
  }

  // Provider errors usually have a `code` property, this is hit if we use contract methods through the SDK
  const code = err?.code;
  if (code === 'ACTION_REJECTED' || code === 4001) {
    return true;
  }

  // Try to match against a stringified error JSON
  // Walletconnect throws something containing `User rejected the request`, Abstract GW throws `User rejected request`
  try {
    const errorString = JSON.stringify(err);
    return !!errorString.match(/user.*request/i)?.length;
  } catch (err) {
    console.debug('[isUserDeniedError] Failed to stringify error', err);
  }

  return false;
}
