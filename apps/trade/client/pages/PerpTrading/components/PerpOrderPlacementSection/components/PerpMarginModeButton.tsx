import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { useSelectedPerpMarginMode } from 'client/pages/PerpTrading/hooks/useSelectedPerpMarginMode';

interface Props extends WithClassnames {
  productId: number | undefined;
}

export function PerpMarginModeButton({ productId, className }: Props) {
  const { selectedMarginMode } = useSelectedPerpMarginMode(productId);
  const { show } = useDialog();

  const selectedLeverage = selectedMarginMode.leverage;
  const selectedMarginModeType = selectedMarginMode.mode;

  return (
    <SecondaryButton
      size="sm"
      onClick={() => {
        if (!productId) {
          return;
        }

        show({
          type: 'perp_margin_mode',
          params: { productId },
        });
      }}
      className={joinClassNames(
        'bg-surface-1 py-1.5',
        'flex items-center justify-center gap-x-1',
        className,
      )}
    >
      <MarginModeText
        marginModeType="isolated"
        isActive={selectedMarginModeType === 'isolated'}
        leverage={selectedLeverage}
      />
      <span className="text-text-tertiary">/</span>
      <MarginModeText
        marginModeType="cross"
        isActive={selectedMarginModeType === 'cross'}
        leverage={selectedLeverage}
      />
    </SecondaryButton>
  );
}

interface MarginModeTextProps {
  marginModeType: MarginModeType;
  isActive: boolean;
  leverage: number;
}

function MarginModeText({
  marginModeType,
  isActive,
  leverage,
}: MarginModeTextProps) {
  return (
    <>
      <span
        className={joinClassNames(
          isActive ? 'text-text-primary' : 'text-text-tertiary',
          'capitalize',
        )}
      >
        {marginModeType}
      </span>
      {isActive && <span className="text-accent">{leverage}x</span>}
    </>
  );
}
