import { PrimaryButton } from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useTransak } from 'client/modules/transak/hooks/useTransak';
import Image from 'next/image';

import transakLogo from 'client/modules/transak/transak-logo.svg';

export function TransakNoticeDialog() {
  const { showTransakDialog } = useTransak();

  const { hide } = useDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Please Note</BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <div className="flex flex-col gap-y-4">
          <p>
            Crypto purchased via Transak will arrive in your wallet, not your
            Vertex balance.
          </p>
          <p>
            You will need to deposit into Vertex after the transaction
            completes.
          </p>
        </div>
        <div className="flex flex-col gap-y-3">
          <PrimaryButton onClick={showTransakDialog}>Buy Crypto</PrimaryButton>
          <div className="flex items-center justify-center gap-x-1">
            <span className="text-text-tertiary text-2xs">Powered by</span>
            <Image src={transakLogo} alt="transak" />
          </div>
        </div>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
