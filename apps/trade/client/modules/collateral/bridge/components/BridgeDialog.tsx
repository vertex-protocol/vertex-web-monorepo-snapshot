import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { LinkButton } from 'client/components/LinkButton';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LINKS } from 'client/modules/brand/links';
import Link from 'next/link';
import { BridgeDismissible } from './BridgeDismissible';
import { BridgeFormContent } from './BridgeFormContent';
import { BridgePoweredBy } from './BridgePoweredBy';

export function BridgeDialog() {
  const { hide } = useDialog();

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title
        onClose={hide}
        endElement={
          <LinkButton
            as={Link}
            color="white"
            className="text-xs"
            href={LINKS.crossChainDocs}
            external
            withExternalIcon
          >
            Tutorial
          </LinkButton>
        }
      >
        Cross-Chain Deposit
      </BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-4">
        <BridgeDismissible />
        <BridgeFormContent />
        <BridgePoweredBy />
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
