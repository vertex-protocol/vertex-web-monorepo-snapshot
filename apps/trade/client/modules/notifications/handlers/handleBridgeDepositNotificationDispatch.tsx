import { asyncResult } from '@vertex-protocol/utils';
import { DEFAULT_TOAST_TTL } from 'client/components/Toast/consts';
import { ActionErrorNotification } from 'client/modules/notifications/components/collateral/ActionErrorNotification';
import { BridgeDepositSuccessNotification } from 'client/modules/notifications/components/collateral/BridgeDepositSuccessNotification';
import {
  BridgeDepositNotificationData,
  NotificationDispatchContext,
} from 'client/modules/notifications/types';
import { createToastId } from 'client/utils/createToastId';
import { getExecuteErrorMessage } from 'client/utils/errors/getExecuteErrorMessage';
import { isUserDeniedError } from 'client/utils/errors/isUserDeniedError';
import { Toast, toast } from 'react-hot-toast';

export async function handleBridgeDepositNotificationDispatch(
  {
    amount,
    sourceChainName,
    sourceTokenSymbol,
    txHashPromise,
  }: BridgeDepositNotificationData,
  { getConfirmedTx }: NotificationDispatchContext,
) {
  const toastId = createToastId('bridgeDeposit');

  const [txReceiptData, txReceiptError] = await asyncResult(
    getConfirmedTx(txHashPromise),
  );

  if (txReceiptData) {
    toast.custom(
      (t: Toast['message']) => {
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
      (t: Toast['message']) => {
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
