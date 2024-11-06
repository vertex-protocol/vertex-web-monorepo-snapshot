import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useSelectedPerpLeverage } from 'client/pages/PerpTrading/hooks/useSelectedPerpLeverage';

interface Props extends WithClassnames {
  productId: number | undefined;
}

export function PerpLeverageSelector({ productId, className }: Props) {
  const { selectedLeverage } = useSelectedPerpLeverage(productId);
  const { show } = useDialog();

  return (
    <SecondaryButton
      size="sm"
      onClick={() => {
        if (!productId) {
          return;
        }

        show({
          type: 'perp_leverage',
          params: { initialLeverage: selectedLeverage, productId },
        });
      }}
      className={joinClassNames(
        'text-text-tertiary hover:text-text-tertiary bg-surface-1',
        'flex items-center justify-center gap-x-1 py-1.5',
        className,
      )}
      endIcon={<Icons.CaretDownFill />}
    >
      Leverage:
      <span className="text-text-primary">{selectedLeverage}x</span>
    </SecondaryButton>
  );
}
