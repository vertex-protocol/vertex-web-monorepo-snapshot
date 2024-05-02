import { useEnableTradingOrderLines } from 'client/modules/trading/hooks/useEnableTradingOrderLines';
import { SwitchLabelWithTooltip } from 'client/components/SwitchLabelWithTooltip';
import { Switch } from '@vertex-protocol/web-ui';

export function OrderLinesToggle() {
  const { enableTradingOrderLines, setEnableTradingOrderLines } =
    useEnableTradingOrderLines();

  return (
    <Switch.Row>
      <SwitchLabelWithTooltip
        definitionId="settingsChartOrderLines"
        id="trading-order-lines"
      >
        Chart Order Lines
      </SwitchLabelWithTooltip>
      <Switch.Toggle
        id="trading-order-lines"
        checked={enableTradingOrderLines}
        onCheckedChange={setEnableTradingOrderLines}
      />
    </Switch.Row>
  );
}
