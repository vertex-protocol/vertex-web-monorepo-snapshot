import { BLITZ_SPECIFIC_LINKS } from '@vertex-protocol/web-common';
import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { clientEnv } from 'common/environment/clientEnv';
import Link from 'next/link';

export function BridgeTabContent() {
  // Temporarily adding BlastBridgeContent until Axelar supports Cross Chain Deposit for Blast
  const content =
    clientEnv.base.brandName === 'vertex' ? (
      <AxelarBridgeContent />
    ) : (
      <BlastBridgeContent />
    );

  return <div className="flex flex-col gap-y-3 py-2">{content}</div>;
}

function AxelarBridgeContent() {
  const { show } = useDialog();

  return (
    <>
      <SecondaryButton
        size="lg"
        // h-10 standard height of buttons between tabs
        className="h-10 justify-start"
        onClick={() =>
          show({
            type: 'bridge',
            params: {},
          })
        }
        startIcon={<Icons.PiArrowsMergeBold size={20} />}
      >
        Cross-Chain Deposit
      </SecondaryButton>
      <p className="text-text-secondary text-xs">
        Easily bridge & deposit assets from other chains.
      </p>
    </>
  );
}

function BlastBridgeContent() {
  return (
    <>
      <SecondaryButton
        as={Link}
        size="lg"
        // h-10 standard height of buttons between tabs
        className="h-10 justify-start"
        startIcon={<Icons.PiArrowsMergeBold size={20} />}
        href={BLITZ_SPECIFIC_LINKS.bridge}
        external
      >
        Bridge To Blast
      </SecondaryButton>
    </>
  );
}
