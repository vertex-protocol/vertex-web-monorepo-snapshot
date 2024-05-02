import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { useShouldFlash } from 'client/hooks/ui/useShouldFlash';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { signDependentValue } from 'client/utils/signDependentValue';
import { useMemo } from 'react';

interface Props {
  lastPriceChange: BigDecimal | undefined;
  lastPrice: BigDecimal | undefined;
  priceIncrement: BigDecimal | undefined;
  setPriceInput: (val: BigDecimal) => void;
  spread: {
    isHighSpread: boolean | undefined;
    spreadFrac: BigDecimal | undefined;
  } | null;
}

export function OrderbookPriceBox({
  lastPriceChange,
  lastPrice,
  priceIncrement,
  setPriceInput,
  spread,
  className,
}: WithClassnames<Props>) {
  const shouldFlash = useShouldFlash({ flashKey: lastPrice?.toString() });

  const onPriceBoxClick = () => {
    if (lastPrice) {
      setPriceInput(lastPrice);
    }
  };

  const variableClassName = useMemo(() => {
    return signDependentValue(lastPriceChange, {
      positive: [
        'text-positive hover:bg-positive/10',
        shouldFlash ? 'bg-positive/50' : 'bg-positive/5',
      ],
      negative: [
        'text-negative hover:bg-negative/10',
        shouldFlash ? 'bg-negative/50' : 'bg-negative/5',
      ],
      zero: ['text-text-primary hover:bg-surface-2'],
    });
  }, [lastPriceChange, shouldFlash]);

  return (
    <DefinitionTooltip definitionId="lastPrice" decoration="none">
      <div
        className={joinClassNames(
          'flex cursor-pointer px-4 py-1.5 text-sm font-medium',
          variableClassName,
          className,
        )}
        onClick={onPriceBoxClick}
      >
        <div className="flex-[2]">
          {formatNumber(lastPrice, {
            formatSpecifier: getMarketPriceFormatSpecifier(priceIncrement),
          })}
        </div>
        {spread && (
          <OrderbookSpreadWarning
            className="flex-1"
            isHighSpread={spread.isHighSpread}
            spreadFrac={spread.spreadFrac}
          />
        )}
      </div>
    </DefinitionTooltip>
  );
}

function OrderbookSpreadWarning({
  className,
  isHighSpread,
  spreadFrac,
}: WithClassnames<{
  isHighSpread: boolean | undefined;
  spreadFrac: BigDecimal | undefined;
}>) {
  return (
    <div
      className={joinClassNames(
        'text-text-tertiary text-2xs flex items-center gap-x-1',
        className,
      )}
    >
      {isHighSpread && (
        <Icons.BsExclamation
          size={16}
          className="text-negative bg-negative-muted rounded-full"
        />
      )}
      Spread:
      <div className={isHighSpread ? 'text-negative' : 'text-text-tertiary'}>
        {formatNumber(spreadFrac, {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        })}
      </div>
    </div>
  );
}
