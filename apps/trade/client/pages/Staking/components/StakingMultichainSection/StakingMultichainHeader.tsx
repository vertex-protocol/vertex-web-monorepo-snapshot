import { LinkButton } from '@vertex-protocol/web-ui';
import { AppPage } from 'client/modules/app/AppPage';
import { LINKS } from 'common/brandMetadata/links/links';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export function StakingMultichainHeader() {
  return (
    <AppPage.Header
      title="More on VRTX"
      description={
        <div className="flex flex-col items-start gap-y-3">
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center">
            <p>
              VRTX is the token of the Vertex Edge ecosystem. A portion of all
              fees from Vertex chains are redirected to the staking pool.
            </p>
            <LinkButton
              colorVariant="primary"
              href={LINKS.docs}
              as={Link}
              withExternalIcon
              external
            >
              Token Docs
            </LinkButton>
          </div>
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center">
            <p>VRTX is multi-chain and can be used on various chains.</p>
            <LinkButton
              colorVariant="primary"
              as={Link}
              href={VERTEX_SPECIFIC_LINKS.transporterBridge}
              external
              withExternalIcon
            >
              Bridge VRTX on Transporter.io
            </LinkButton>
          </div>
        </div>
      }
    />
  );
}
