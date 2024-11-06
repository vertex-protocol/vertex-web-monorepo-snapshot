import { WithChildren } from '@vertex-protocol/web-common';
import { AppPage } from 'client/modules/app/AppPage';
import { TradingCompetitionInitialLoadWrapper as InitialLoadWrapper } from 'client/pages/TradingCompetition/components/TradingCompetitionLayout/TradingCompetitionInitialLoadWrapper';
import { TradingCompetitionConfigKey } from 'client/pages/TradingCompetition/configs/configs';
import { TradingCompetitionContextProvider } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';

interface Props extends WithChildren {
  configKey: TradingCompetitionConfigKey;
}

export function TradingCompetitionLayout({ configKey, children }: Props) {
  return (
    <AppPage.Content layoutWidth="sm">
      <TradingCompetitionContextProvider configKey={configKey}>
        <InitialLoadWrapper>{children}</InitialLoadWrapper>
      </TradingCompetitionContextProvider>
    </AppPage.Content>
  );
}
