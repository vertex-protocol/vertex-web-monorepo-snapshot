import { WithChildren } from '@vertex-protocol/web-common';
import { TradingCompetitionLayout } from 'client/pages/TradingCompetition/components/TradingCompetitionLayout/TradingCompetitionLayout';
import { clientEnv } from 'common/environment/clientEnv';

export default function TradingCompetitionPageLayout({
  children,
}: WithChildren) {
  const configKey =
    clientEnv.base.dataEnv === 'vertexMainnet'
      ? 'seiRound1'
      : 'seiTestnetRound1';

  return (
    <TradingCompetitionLayout configKey={configKey}>
      {children}
    </TradingCompetitionLayout>
  );
}
