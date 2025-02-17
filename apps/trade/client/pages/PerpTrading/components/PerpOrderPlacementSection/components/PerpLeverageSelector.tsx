import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { useSelectedPerpMarginMode } from 'client/pages/PerpTrading/hooks/useSelectedPerpMarginMode';

interface Props extends WithClassnames {
  productId: number | undefined;
}

export function PerpLeverageSelector({ productId, className }: Props) {
  const { isIsoMarginEnabled } = useEnabledFeatures();
  const { selectedMarginMode } = useSelectedPerpMarginMode(productId);
  const { show } = useDialog();

  const currentLeverage = selectedMarginMode.leverage;
  const buttonContent = (() => {
    const currentLeverageContent = (
      <span className="text-text-primary">{currentLeverage}x</span>
    );

    if (!isIsoMarginEnabled) {
      return (
        <>
          Leverage:
          {currentLeverageContent}
        </>
      );
    }

    return (
      <>
        {selectedMarginMode.mode === 'cross' ? 'Cross' : 'Isolated'}
        {currentLeverageContent}
      </>
    );
  })();

  return (
    <SecondaryButton
      size="sm"
      onClick={() => {
        if (!productId) {
          return;
        }

        if (isIsoMarginEnabled) {
          show({
            type: 'perp_margin_mode',
            params: { productId },
          });
        } else {
          show({
            type: 'perp_leverage',
            params: { productId, initialLeverage: currentLeverage },
          });
        }
      }}
      className={joinClassNames(
        'text-text-tertiary hover:text-text-tertiary bg-surface-1',
        'flex items-center justify-center gap-x-1 py-1.5',
        className,
      )}
      endIcon={<Icons.CaretDownFill />}
    >
      {buttonContent}
    </SecondaryButton>
  );
}
