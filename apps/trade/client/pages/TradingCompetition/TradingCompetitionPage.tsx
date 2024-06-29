import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { Spinner } from '@vertex-protocol/web-ui';
import { AppPage } from 'client/modules/app/AppPage';
import { APP_PAGE_PADDING } from 'client/modules/app/consts/padding';
import { TradingCompetitionInfoCards } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionInfoCards';
import { TradingCompetitionPageHeader } from 'client/pages/TradingCompetition/components/TradingCompetitionPageHeader/TradingCompetitionPageHeader';
import { TradingCompetitionPeriodHeading } from 'client/pages/TradingCompetition/components/TradingCompetitionPeriodHeading';
import { TradingCompetitionPrizeHero } from 'client/pages/TradingCompetition/components/TradingCompetitionPrizeHero';
import { TradingCompetitionResults } from 'client/pages/TradingCompetition/components/TradingCompetitionResults/TradingCompetitionResults';
import {
  TRADING_COMPETITION_CONFIGS_BY_KEY,
  TradingCompetitionConfigKey,
} from 'client/pages/TradingCompetition/configs/configs';
import {
  TradingCompetitionContextProvider,
  useTradingCompetitionContext,
} from 'client/pages/TradingCompetition/context/TradingCompetitionContext';

export function TradingCompetitionPage({
  configKey,
}: {
  configKey: TradingCompetitionConfigKey;
}) {
  const config = TRADING_COMPETITION_CONFIGS_BY_KEY[configKey];

  return (
    <AppPage.Root
      routeName={config.routeName}
      contentWrapperClassName={joinClassNames(
        APP_PAGE_PADDING.horizontal,
        APP_PAGE_PADDING.vertical,
      )}
    >
      <AppPage.Content className="max-w-[1110px]">
        <TradingCompetitionContextProvider config={config}>
          <InitialLoadWrapper>
            <TradingCompetitionPageHeader />
            <TradingCompetitionPrizeHero />
            <TradingCompetitionPeriodHeading />
            <TradingCompetitionInfoCards />
            <p className="text-text-tertiary text-xs lg:text-sm">
              Winners are based on % PnL, which uses cash flow adjusted
              earnings.
              <br />
              Rankings and eligibility update once every few hours. Rankings
              will be finalized a few hours after the competition ends.
            </p>
            <TradingCompetitionResults />
          </InitialLoadWrapper>
        </TradingCompetitionContextProvider>
      </AppPage.Content>
      {config.pageBgImage}
    </AppPage.Root>
  );
}

function InitialLoadWrapper({ children }: WithChildren) {
  const { currentContest } = useTradingCompetitionContext();

  // We have a fair amount of components that depend on this data, so instead
  // of creating loading states for them individually, we just show one here.
  if (!currentContest) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="text-text-tertiary" size={40} />
      </div>
    );
  }

  return children;
}
