import { joinClassNames } from '@vertex-protocol/web-common';
import { LinkButton } from 'client/components/LinkButton';
import { AppPage } from 'client/modules/app/AppPage';
import { APP_PAGE_PADDING } from 'client/modules/app/consts/padding';
import { LINKS } from 'common/brandMetadata/links/links';
import {
  ARB_CHAIN_IDS,
  BLAST_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import Link from 'next/link';
import { MoneyMarketsTable } from 'client/modules/tables/MoneyMarketsTable';
import { TvlStats } from './components/TvlStats';

export function MoneyMarketsPage() {
  const showStatsLink = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...BLAST_CHAIN_IDS,
  ]);

  return (
    <AppPage.Root
      routeName="Earn"
      contentWrapperClassName={joinClassNames(
        APP_PAGE_PADDING.horizontal,
        APP_PAGE_PADDING.vertical,
      )}
    >
      <AppPage.Content>
        <div className="flex flex-col gap-y-2 sm:flex-row sm:justify-between">
          <AppPage.EarnHeader
            title="Lend/Borrow"
            description="Earn on your margin: interest is automatically earned on all deposits."
          />
          <div className="flex items-center gap-x-4">
            <TvlStats />
            {showStatsLink && (
              <LinkButton
                external
                withExternalIcon
                className="text-xs lg:text-sm"
                as={Link}
                href={LINKS.stats}
                colorVariant="primary"
              >
                Stats
              </LinkButton>
            )}
          </div>
        </div>
        <MoneyMarketsTable />
      </AppPage.Content>
    </AppPage.Root>
  );
}
