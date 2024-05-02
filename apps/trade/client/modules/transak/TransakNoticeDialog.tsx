import { PrimaryButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useTransak } from 'client/modules/transak/hooks/useTransak';
import Image from 'next/image';
import transakLogo from './transak-logo.svg';

export function TransakNoticeDialog() {
  const { showTransakDialog } = useTransak();

  const { hide } = useDialog();

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Please Note</BaseDialog.Title>
      <BaseDialog.Body className="text-text-secondary flex flex-col gap-y-6 text-sm">
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
          <PrimaryButton size="lg" onClick={showTransakDialog}>
            Buy Crypto
          </PrimaryButton>
          <div className="text-2xs flex justify-center gap-x-1">
            <span className="text-text-tertiary">Powered by</span>
            <Image src={transakLogo} alt="transak" />
          </div>
        </div>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
