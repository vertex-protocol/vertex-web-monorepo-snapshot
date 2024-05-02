import { Divider, GradientPill, PrimaryButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RangeSlider } from 'client/modules/trading/components/RangeSlider';
import { usePerpLeverage } from 'client/pages/PerpTrading/hooks/usePerpLeverage';
import { useSelectedPerpLeverage } from 'client/pages/PerpTrading/hooks/useSelectedPerpLeverage';
import Image from 'next/image';
import { PerpLeverageInfoCollapsible } from './PerpLeverageInfoCollapsible';

export interface PerpLeverageDialogParams {
  initialLeverage: number;
}

export function PerpLeverageDialog({
  initialLeverage,
}: PerpLeverageDialogParams) {
  const { hide } = useDialog();
  const { currentMarket, leverage, maxLeverage, setLeverage } = usePerpLeverage(
    {
      initialLeverage,
    },
  );
  const { setSelectedLeverage: setLeverageAtomValue } = useSelectedPerpLeverage(
    currentMarket?.productId,
  );

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Adjust Leverage</BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-4">
          <PerpLeverageInfoCollapsible />
          <Divider />
          {currentMarket && (
            <div className="text-text-primary flex items-center gap-x-2 ">
              <Image
                src={currentMarket.metadata.icon.asset}
                alt={currentMarket.metadata.symbol}
                width={18}
                height={18}
              />
              <div className="font-bold">
                {currentMarket.metadata.marketName}
              </div>
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
          size="lg"
          onClick={() => {
            setLeverageAtomValue(leverage);
            hide();
          }}
        >
          Confirm
        </PrimaryButton>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
