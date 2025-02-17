import { WithChildren } from '@vertex-protocol/web-common';
import { TradingCompetitionLayout } from 'client/pages/TradingCompetition/components/TradingCompetitionLayout/TradingCompetitionLayout';
import { TradingCompetitionConfigKey } from 'client/pages/TradingCompetition/configs/configs';
import { clientEnv } from 'common/environment/clientEnv';

export default function TradingCompetitionPageLayout({
  children,
}: WithChildren) {
  const configKey: TradingCompetitionConfigKey =
    clientEnv.base.dataEnv === 'vertexMainnet'
      ? 'vertexRound1'
      : 'vertexTestnetRound1';

  return (
    <TradingCompetitionLayout configKey={configKey}>
      {children}
    </TradingCompetitionLayout>
  );
}
