import { Divider } from '@vertex-protocol/web-ui';
import { LinkButton } from 'client/components/LinkButton';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export function NoWalletInstructions() {
  return (
    <div className="flex flex-col gap-y-4 text-sm">
      <div className="flex flex-col gap-y-0.5">
        <div className="text-text-primary">Don’t see your wallet?</div>
        <div className="text-text-tertiary">
          WalletConnect supports 50+ options
        </div>
      </div>
      <Divider />
      <div className="flex gap-x-2">
        <div className="text-text-primary">Don’t have a wallet?</div>
        <LinkButton
          as={Link}
          colorVariant="primary"
          href={VERTEX_SPECIFIC_LINKS.arbWallets}
          external
        >
          Create One
        </LinkButton>
      </div>
    </div>
  );
}
