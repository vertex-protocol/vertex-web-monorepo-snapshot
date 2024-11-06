import { WithChildren } from '@vertex-protocol/web-common';
import { TradingCompetitionLayout } from 'client/pages/TradingCompetition/components/TradingCompetitionLayout/TradingCompetitionLayout';
import { clientEnv } from 'common/environment/clientEnv';

export default function TradingCompetitionPageLayout({
  children,
}: WithChildren) {
  const configKey =
    clientEnv.base.dataEnv === 'vertexMainnet'
      ? 'seiRound3'
      : 'seiTestnetRound3';

  return (
    <TradingCompetitionLayout configKey={configKey}>
      {children}
    </TradingCompetitionLayout>
  );
}
