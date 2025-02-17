'use client';
import {
  Content as TabsContent,
  TabsList,
  Root as TabsRoot,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { joinClassNames } from '@vertex-protocol/web-common';
import { UnderlinedTabs } from '@vertex-protocol/web-ui';
import { TimeframeSelect } from 'client/components/TimeframeSelect/TimeframeSelect';
import { OpenInterestFundingAndLiquidationsTabContent } from 'client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/OpenInterestFundingAndLiquidationsTabContent';
import { OverviewTabContent } from 'client/pages/MainPage/components/OverviewTabContent/OverviewTabContent';
import { RevenueAndUsersTabContent } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueAndUsersTabContent';
import { TvlAndYieldTabContent } from 'client/pages/MainPage/components/TvlAndYieldTabContent/TvlAndYieldTabContent';
import { VolumesTabContent } from 'client/pages/MainPage/components/VolumesTabContent/VolumesTabContent';
import { useState } from 'react';

const TABS = [
  {
    id: 'overview',
    label: 'Overview',
    content: <OverviewTabContent />,
    disabled: false,
  },
  {
    id: 'volumes',
    label: 'Volumes',
    content: <VolumesTabContent />,
    disabled: false,
  },
  {
    id: 'open_interest_funding_and_liquidations',
    label: 'OI, Funding & Liquidations',
    content: <OpenInterestFundingAndLiquidationsTabContent />,
    disabled: false,
  },
  {
    id: 'revenue_and_users',
    label: 'Revenue & Users',
    content: <RevenueAndUsersTabContent />,
    disabled: false,
  },
  {
    id: 'tvl_and_yield',
    label: 'TVL & Yield',
    content: <TvlAndYieldTabContent />,
    disabled: false,
  },
  {
    id: 'vertex_token',
    label: 'VRTX Token (Coming Soon)',
    content: null,
    disabled: true,
  },
];

export function DashboardTabs() {
  const [selectedTabId, setSelectedTabId] = useState(TABS[0].id);

  return (
    <TabsRoot
      className="flex flex-col gap-y-4 sm:gap-y-8"
      value={selectedTabId}
      onValueChange={setSelectedTabId}
    >
      <div
        className={joinClassNames(
          'flex flex-col justify-start gap-2.5',
          'sm:flex-row sm:items-center sm:justify-between',
        )}
      >
        <TabsList className="no-scrollbar overflow-auto">
          <UnderlinedTabs.Container>
            {TABS.map(({ id, label, disabled }) => {
              return (
                <TabsTrigger disabled={disabled} asChild value={id} key={id}>
                  <UnderlinedTabs.Button
                    size="lg"
                    active={selectedTabId === id}
                    className="font-semibold"
                  >
                    {label}
                  </UnderlinedTabs.Button>
                </TabsTrigger>
              );
            })}
          </UnderlinedTabs.Container>
        </TabsList>
        <TimeframeSelect />
      </div>

      {TABS.map(({ id, content }) => (
        <TabsContent
          className="flex flex-col gap-y-7 empty:hidden"
          value={id}
          key={id}
        >
          {content}
        </TabsContent>
      ))}
    </TabsRoot>
  );
}
