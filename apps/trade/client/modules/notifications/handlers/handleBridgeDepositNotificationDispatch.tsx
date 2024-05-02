import { toast } from 'react-hot-toast';
import { createToastId } from 'client/utils/createToastId';
import { BridgeDepositSuccessNotification } from '../components/collateral/BridgeDepositSuccessNotification';
import { DEFAULT_TOAST_TTL } from 'client/components/Toast/consts';
import { BridgeDepositNotificationData } from '../types';
import { ActionErrorNotification } from '../components/collateral/ActionErrorNotification';
import { asyncResult } from '@vertex-protocol/web-common';
import { getConfirmedTxPromise } from 'client/utils/getConfirmedTxPromise';
import { getExecuteErrorMessage } from 'client/utils/errors/getExecuteErrorMessage';
import { isUserDeniedError } from 'client/utils/errors/isUserDeniedError';

export async function handleBridgeDepositNotificationDispatch({
  amount,
  sourceChainName,
  sourceTokenSymbol,
  txResponsePromise,
}: BridgeDepositNotificationData) {
  const toastId = createToastId('bridgeDeposit');

  const [txReceiptData, txReceiptError] = await asyncResult(
    getConfirmedTxPromise(txResponsePromise),
  );

  if (txReceiptData) {
    toast.custom(
      (t) => {
        return (
          <BridgeDepositSuccessNotification
            txHash={txReceiptData.hash}
            chainName={sourceChainName}
            amount={amount}
            symbol={sourceTokenSymbol}
            visible={t.visible}
            ttl={10000}
            onDismiss={() => {
              toast.dismiss(t.id);
            }}
          />
        );
      },
      {
        id: toastId,
        duration: 10000,
      },
    );
  } else if (!isUserDeniedError(txReceiptError)) {
    toast.custom(
      (t) => {
        return (
          <ActionErrorNotification
            title="Cross-Chain Deposit Failed"
            bodyContent={
              <>
                Your funds remain on the source chain and have not been
                deposited into your Vertex account.
                <br />
                <br />
                {getExecuteErrorMessage(txReceiptError)}
              </>
            }
            visible={t.visible}
            ttl={DEFAULT_TOAST_TTL}
            onDismiss={() => {
              toast.dismiss(t.id);
            }}
          />
        );
      },
      {
        id: toastId,
        duration: DEFAULT_TOAST_TTL,
      },
    );
  }
}
