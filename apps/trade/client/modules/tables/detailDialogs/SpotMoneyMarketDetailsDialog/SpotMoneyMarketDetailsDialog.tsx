import {
  formatNumber,
  PresetNumberFormatSpecifier,
  SpotProductMetadata,
} from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { SignOfValuePill } from 'client/components/SignOfValuePill';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { HistoricalInterestRateChart } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/HistoricalInterestRateChart/HistoricalInterestRateChart';
import { useSpotBalanceHealthMetrics } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/useSpotBalanceHealthMetrics';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BigDecimal } from '@vertex-protocol/client';

export interface SpotMoneyMarketDetailsDialogParams {
  metadata: SpotProductMetadata;
  productId: number;
}

export function SpotMoneyMarketDetailsDialog({
  productId,
  metadata,
}: SpotMoneyMarketDetailsDialogParams) {
  const { hide } = useDialog();

  return (
    <BaseAppDialog.Container className="sm:w-[648px]" onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        {metadata.token.symbol}
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <SectionTitle>Asset Weights &amp; Margin</SectionTitle>
        <HealthMetrics productId={productId} />
        <Divider />
        <SectionTitle>Historical Rates</SectionTitle>
        <HistoricalInterestRateChart productId={productId} />
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}

function SectionTitle({ children }: WithChildren) {
  return <h2 className="text-text-primary text-sm">{children}</h2>;
}

function HealthMetrics({ productId }: { productId: number }) {
  const { data: spotBalanceHealthMetricsData } = useSpotBalanceHealthMetrics({
    productId,
  });

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      <ValueWithLabel.Vertical
        label="Initial Weight"
        value={spotBalanceHealthMetricsData?.initialHealth.weight}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
      />
      <ValueWithLabel.Vertical
        label="Initial Margin"
        valueContent={
          <MarginValueContent
            marginUsd={spotBalanceHealthMetricsData?.initialHealth.marginUsd}
          />
        }
      />
      <ValueWithLabel.Vertical
        label="Maint. Weight"
        value={spotBalanceHealthMetricsData?.maintenanceHealth.weight}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
      />
      <ValueWithLabel.Vertical
        label="Maint. Margin"
        valueContent={
          <MarginValueContent
            marginUsd={
              spotBalanceHealthMetricsData?.maintenanceHealth.marginUsd
            }
          />
        }
      />
    </div>
  );
}

function MarginValueContent({
  marginUsd,
}: {
  marginUsd: BigDecimal | undefined;
}) {
  return (
    <div className="flex items-center gap-x-1">
      <SignOfValuePill value={marginUsd} />
      {formatNumber(marginUsd?.abs(), {
        formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      })}
    </div>
  );
}
