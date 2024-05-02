import {
  TabsContent,
  TabsList,
  Root as TabsRoot,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons, UnderlinedTabs } from '@vertex-protocol/web-ui';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { AppPage } from 'client/modules/app/AppPage';
import { APP_PAGE_PADDING } from 'client/modules/app/consts/padding';
import { TokenPageTitle } from 'client/pages/VertexToken/components/TokenPageTitle';
import Link from 'next/link';
import { TokenPoolTabContent } from './pool/TokenPoolTabContent';
import { TokenStakingTabContent } from './staking/TokenStakingTabContent';

const TOKEN_PAGE_TABS = [
  {
    id: 'staking',
    content: <TokenStakingTabContent />,
  },
  {
    id: 'pool',
    content: <TokenPoolTabContent />,
  },
] as const;

export function VertexTokenPage() {
  const productTradingLinks = useProductTradingLinks();

  const { selectedTabId, setSelectedUntypedTabId, tabs } =
    useTabs(TOKEN_PAGE_TABS);
  const { protocolTokenProductId } = useVertexMetadataContext();

  const vrtxTradingLink =
    productTradingLinks[protocolTokenProductId]?.link ?? '';

  return (
    <AppPage.Root
      hideHighlights
      routeName="VRTX Token"
      contentWrapperClassName={joinClassNames(
        APP_PAGE_PADDING.horizontal,
        APP_PAGE_PADDING.vertical,
      )}
    >
      <AppPage.Content className="max-w-[1100px] gap-y-4">
        <TokenPageTitle />
        <TabsRoot
          className="flex flex-col gap-y-6"
          value={selectedTabId}
          onValueChange={setSelectedUntypedTabId}
        >
          <TabsList>
            <UnderlinedTabs.Container>
              {tabs.map(({ id }) => (
                <TabsTrigger asChild value={id} key={id}>
                  <UnderlinedTabs.Button
                    size="lg"
                    active={id === selectedTabId}
                    className="capitalize"
                  >
                    {id}
                  </UnderlinedTabs.Button>
                </TabsTrigger>
              ))}
              <UnderlinedTabs.Button
                size="lg"
                className="gap-x-1.5"
                as={Link}
                href={vrtxTradingLink}
                endIcon={<Icons.MdArrowOutward />}
              >
                Trade
              </UnderlinedTabs.Button>
            </UnderlinedTabs.Container>
          </TabsList>
          {tabs.map(({ id, content }) => (
            <TabsContent key={id} value={id}>
              {content}
            </TabsContent>
          ))}
        </TabsRoot>
      </AppPage.Content>
    </AppPage.Root>
  );
}