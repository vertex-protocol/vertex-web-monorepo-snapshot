import {
  WithClassnames,
  joinClassNames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import {
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { SecondaryButton } from '@vertex-protocol/web-ui';

const fractions = [0.25, 0.5, 0.75, 1];

interface Props extends WithClassnames {
  selectedFraction: number | undefined;
  disabled?: boolean;
  onFractionSelected: (fraction: number) => void;
}

export function FractionAmountButtons({
  className,
  selectedFraction,
  disabled,
  onFractionSelected,
}: Props) {
  return (
    <div
      className={joinClassNames(
        'flex w-full items-center justify-between gap-x-1',
        disabled && 'cursor-not-allowed',
        className,
      )}
    >
      {fractions.map((fraction, index) => {
        return (
          <FractionAmountButton
            key={index}
            isSelected={fraction === selectedFraction}
            fraction={fraction}
            disabled={disabled}
            onFractionSelected={() => onFractionSelected(fraction)}
          />
        );
      })}
    </div>
  );
}

interface FractionAmountButtonProps {
  fraction: number;
  isSelected: boolean;
  disabled?: boolean;
  onFractionSelected: () => void;
}

function FractionAmountButton({
  disabled,
  fraction,
  isSelected,
  onFractionSelected,
}: FractionAmountButtonProps) {
  const classNames = (() => {
    if (disabled) {
      return 'bg-surface-1 border-transparent text-disabled';
    }
    if (isSelected) {
      return 'bg-surface-3 border-accent text-text-primary';
    }
    return 'bg-surface-2 border-transparent text-text-secondary';
  })();

  return (
    <SecondaryButton
      className={mergeClassNames('flex-1 border', classNames)}
      size="xs"
      onClick={onFractionSelected}
      disabled={disabled}
    >
      {formatNumber(fraction, {
        formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_INT,
      })}
    </SecondaryButton>
  );
}
