import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { PerpStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { PerpMarginModeCrossInfo } from 'client/modules/trading/components/PerpMarginModeCrossInfo';

import { PerpMarginModeLeverageInput } from 'client/pages/PerpTrading/components/PerpMarginModeDialog/PerpMarginModeLeverageInput';

interface Props {
  currentMarket: PerpStaticMarketData | undefined;
  leverage: number;
  setLeverage: (value: number) => void;
}

export function PerpMarginModeCrossTabContent({
  currentMarket,
  leverage,
  setLeverage,
}: Props) {
  return (
    <>
      <UserDisclosureDismissibleCard
        disclosureKey="perp_margin_mode_cross_info"
        title="Cross Margin"
        description={<PerpMarginModeCrossInfo />}
      />
      <DefinitionTooltip
        decoration={{ icon: true }}
        definitionId="perpMarginModeCrossInfo"
      >
        Cross Margin
      </DefinitionTooltip>
      <PerpMarginModeLeverageInput
        leverage={leverage}
        setLeverage={setLeverage}
        currentMarket={currentMarket}
      />
    </>
  );
}
