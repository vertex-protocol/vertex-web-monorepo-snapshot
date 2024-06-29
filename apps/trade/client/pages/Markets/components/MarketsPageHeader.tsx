import { LinkButton } from 'client/components/LinkButton';
import { AppPage } from 'client/modules/app/AppPage';
import { LINKS } from 'common/brandMetadata/links/links';
import { ChainSpecificContent } from 'client/modules/envSpecificContent/ChainSpecificContent';
import {
  ARB_CHAIN_IDS,
  BLAST_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import Link from 'next/link';

export function MarketsPageHeader() {
  return (
    <div className="flex justify-between">
      <AppPage.Header title="Markets" />
      <ChainSpecificContent
        enabledChainIds={[...ARB_CHAIN_IDS, ...BLAST_CHAIN_IDS]}
      >
        <LinkButton
          colorVariant="primary"
          as={Link}
          href={LINKS.stats}
          className="text-sm"
          external
          withExternalIcon
        >
          Stats Dashboard
        </LinkButton>
      </ChainSpecificContent>
    </div>
  );
}
