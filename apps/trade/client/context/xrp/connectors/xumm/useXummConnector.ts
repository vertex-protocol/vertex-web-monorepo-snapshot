import { asyncResult } from '@vertex-protocol/utils';
import { XrpConnector } from 'client/context/xrp/connectors/types';
import { SignedXummPayloadSubscriptionMessage } from 'client/context/xrp/connectors/xumm/types';
import { useXummSdkQuery } from 'client/context/xrp/connectors/xumm/useXummSdkQuery';
import { XrpWalletRequestRejectedError } from 'client/context/xrp/XrpWalletRequestRejectedError';
import { clientEnv } from 'common/environment/clientEnv';
import { get } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Hex } from 'viem';
import type { Xumm } from 'xumm';

export interface XummConnector extends XrpConnector<'xumm'> {
  sdk: Xumm | undefined;
}

export function useXummConnector(): XummConnector {
  const [address, setAddress] = useState<string>();
  const { data: xummSdk } = useXummSdkQuery();

  /**
   * Setup SDK listeners and update status
   * https://docs.xaman.dev/js-ts-sdk/sdk-syntax/xumm.on-event-fn#web3-browser-signed-out-and-then-signing-in
   */
  useEffect(() => {
    setAddress(undefined);

    if (!xummSdk) {
      return;
    }

    /**
     * Setup listeners
     */
    const onError = (error: Error) => {
      console.error('[useXummConnector] Error', error);
    };
    // This is called only when the SDK starts in a disconnected state, and user connects after initialization
    // However, this handler seems to only be called on desktop, hence the extra state-setting in `connect()`
    const onSuccess = async () => {
      const account = await getSdkAccount(xummSdk);
      if (!account) {
        console.error(
          '[useXummConnector] Received success event without account',
        );
        return;
      }
      setAddress(account);
    };
    const onLogout = () => {
      setAddress(undefined);
    };

    xummSdk.on('error', onError);
    xummSdk.on('success', onSuccess);
    xummSdk.on('logout', onLogout);

    // State initialization for connection status. The `getSdkAccount` promise does not resolve until an account is connected
    // so if the SDK starts in a connected state (ie reconnects), the promise is resolved immediately
    // However, if the SDK starts in a disconnected state, the promise will not resolve until the user connects
    let isCancelled = false;
    getSdkAccount(xummSdk).then((account) => {
      if (isCancelled) {
        return;
      }
      if (account) {
        setAddress(account);
      } else {
        setAddress(undefined);
      }
    });

    return () => {
      xummSdk.off('error', onError);
      xummSdk.off('success', onSuccess);
      xummSdk.off('logout', onLogout);
      isCancelled = true;
    };
  }, [xummSdk]);

  const connect = useCallback(async () => {
    if (!xummSdk) {
      return;
    }

    const [authorizationResult, error] = await asyncResult(xummSdk.authorize());
    if (authorizationResult && 'jwt' in authorizationResult) {
      setAddress(authorizationResult.me.account);
    } else {
      console.error(
        '[useXummConnector] Error connecting. Authorization result',
        authorizationResult,
        'Error',
        error,
      );
    }
  }, [xummSdk]);

  const disconnect = useCallback(async () => {
    await xummSdk?.logout();
  }, [xummSdk]);

  const getLinkedSignerAuthorization = useCallback(async (): Promise<Hex> => {
    const address = await getSdkAccount(xummSdk);
    if (!xummSdk?.payload || !address) {
      throw Error(
        '[useXummConnector] Xumm SDK not logged in or not initialized',
      );
    }

    const payloadResult = await xummSdk.payload.createAndSubscribe(
      {
        custom_meta: {
          instruction:
            'Create a 1-Click Trading key for this account. The key will be used to sign transactions on your behalf.',
        },
        txjson: {
          TransactionType: 'AccountSet',
          Fee: 0,
          Sequence: 1,
          // This needs to be a very large number > current ledger sequence. Xaman checks the validity of this sequence
          // and overwrites it if invalid.
          LastLedgerSequence: 999999999,
        },
        options: {
          submit: false,
          force_network: clientEnv.isTestnetDataEnv ? 'TESTNET' : 'MAINNET',
        },
      },
      (eventMessage) => {
        if ('signed' in eventMessage.data) {
          return eventMessage;
        }
      },
    );

    const resolvedPayloadData = get(await payloadResult.resolved, 'data') as
      | SignedXummPayloadSubscriptionMessage
      | undefined;

    if (!resolvedPayloadData) {
      throw Error('[useXummConnector] No resolved payload data');
    }
    if (!resolvedPayloadData.signed) {
      throw new XrpWalletRequestRejectedError();
    }

    const retrievedPayload = await xummSdk.payload.get(
      resolvedPayloadData.payload_uuidv4,
    );
    if (!retrievedPayload?.response) {
      throw Error('[useXummConnector] No response in payload');
    }

    return `0x${retrievedPayload.response.hex}`;
  }, [xummSdk]);

  return {
    id: 'xumm',
    sdk: xummSdk,
    address,
    connect,
    disconnect,
    getLinkedSignerAuthorization,
  };
}

async function getSdkAccount(
  xummSdk: Xumm | undefined,
): Promise<string | undefined> {
  return xummSdk?.user.account;
}
