import { Divider, GradientPill, PrimaryButton } from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RangeSlider } from 'client/modules/trading/components/RangeSlider';
import { PerpLeverageInfoCollapsible } from 'client/pages/PerpTrading/components/PerpLeverageDialog/PerpLeverageInfoCollapsible';
import { usePerpLeverageDialog } from 'client/pages/PerpTrading/hooks/usePerpLeverageDialog';
import { useSelectedPerpLeverage } from 'client/pages/PerpTrading/hooks/useSelectedPerpLeverage';
import Image from 'next/image';

export interface PerpLeverageDialogParams {
  initialLeverage: number;
  productId: number;
}

export function PerpLeverageDialog({
  initialLeverage,
  productId,
}: PerpLeverageDialogParams) {
  const { hide } = useDialog();
  const { currentMarket, leverage, maxLeverage, setLeverage } =
    usePerpLeverageDialog({
      initialLeverage,
      productId,
    });
  const { setSelectedLeverage: setLeverageAtomValue } = useSelectedPerpLeverage(
    currentMarket?.productId,
  );

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Adjust Leverage</BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <div className="flex flex-col gap-y-4">
          <PerpLeverageInfoCollapsible />
          <Divider />
          {currentMarket && (
            <div className="flex items-center gap-x-2">
              <Image
                src={currentMarket.metadata.icon.asset}
                alt={currentMarket.metadata.symbol}
                width={18}
                height={18}
              />
              <span className="text-text-primary text-base">
                {currentMarket.metadata.marketName}
              </span>
              <GradientPill>MAX {maxLeverage}x</GradientPill>
            </div>
          )}
          {currentMarket && (
            <RangeSlider
              min={1}
              max={currentMarket.maxLeverage}
              step={1}
              value={leverage}
              renderValue={(value) => `${value}x`}
              onValueChange={setLeverage}
            />
          )}
        </div>
        <PrimaryButton
          onClick={() => {
            setLeverageAtomValue(leverage);
            hide();
          }}
        >
          Confirm
        </PrimaryButton>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
