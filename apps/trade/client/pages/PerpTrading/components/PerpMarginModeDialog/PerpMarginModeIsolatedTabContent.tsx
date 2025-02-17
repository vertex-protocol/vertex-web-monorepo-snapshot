import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { Switch } from '@vertex-protocol/web-ui';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { PerpStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { PerpMarginModeIsolatedInfo } from 'client/modules/trading/components/PerpMarginModeIsolatedInfo';

import { PerpMarginModeLeverageInput } from 'client/pages/PerpTrading/components/PerpMarginModeDialog/PerpMarginModeLeverageInput';

interface Props {
  currentMarket: PerpStaticMarketData | undefined;
  leverage: number;
  enableIsoBorrows: boolean;
  setLeverage: (value: number) => void;
  setEnableIsoBorrows: (value: boolean) => void;
}

export function PerpMarginModeIsolatedTabContent({
  currentMarket,
  leverage,
  enableIsoBorrows,
  setLeverage,
  setEnableIsoBorrows,
}: Props) {
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();

  return (
    <>
      <UserDisclosureDismissibleCard
        disclosureKey="perp_margin_mode_iso_info"
        title="Isolated Margin"
        description={<PerpMarginModeIsolatedInfo />}
      />
      <DefinitionTooltip
        decoration={{ icon: true }}
        definitionId="perpMarginModeIsoInfo"
      >
        Isolated Margin
      </DefinitionTooltip>
      <PerpMarginModeLeverageInput
        leverage={leverage}
        setLeverage={setLeverage}
        currentMarket={currentMarket}
      />
      <Switch.Row>
        <Switch.Label id="enableIsoBorrows">
          Enable Borrowing {primaryQuoteSymbol}
        </Switch.Label>
        <Switch.Toggle
          id="enableIsoBorrows"
          checked={enableIsoBorrows}
          onCheckedChange={setEnableIsoBorrows}
        />
      </Switch.Row>
    </>
  );
}
