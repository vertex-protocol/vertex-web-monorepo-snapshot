import {
  formatNumber,
  getMarketPriceFormatSpecifier,
  PresetNumberFormatSpecifier,
  signDependentValue,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import {
  joinClassNames,
  mergeClassNames,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { useShouldFlash } from 'client/hooks/ui/useShouldFlash';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { OrderbookViewType } from 'client/modules/trading/marketOrders/orderbook/types';
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
  viewType: OrderbookViewType;
}

export function OrderbookPriceBox({
  lastPriceChange,
  lastPrice,
  priceIncrement,
  setPriceInput,
  spread,
  viewType,
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
        'text-positive hover:bg-positive/30 border-transparent',
        shouldFlash ? 'bg-positive/50' : 'bg-positive/15',
      ],
      negative: [
        'text-negative hover:bg-negative/30 border-transparent',
        shouldFlash ? 'bg-negative/50' : 'bg-negative/15',
      ],
      zero: [
        'text-text-primary hover:bg-surface-2',

        // when viewType is only_asks, price box sticks to the bottom of orderbook component
        // to avoid double border, we stroke only top border
        viewType === 'only_asks'
          ? 'border-t-stroke border-b-transparent'
          : 'border-stroke',
      ],
    });
  }, [lastPriceChange, shouldFlash, viewType]);

  return (
    <DefinitionTooltip definitionId="lastPrice" decoration="none">
      <div
        className={mergeClassNames(
          'flex cursor-pointer justify-between border-y px-4 py-1.5',
          'text-sm transition-colors duration-150',
          variableClassName,
          className,
        )}
        onClick={onPriceBoxClick}
      >
        <div>
          {formatNumber(lastPrice, {
            formatSpecifier: getMarketPriceFormatSpecifier(priceIncrement),
          })}
        </div>
        {spread && (
          <Spread
            isHighSpread={spread.isHighSpread}
            spreadFrac={spread.spreadFrac}
          />
        )}
      </div>
    </DefinitionTooltip>
  );
}

function Spread({
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
        <Icons.ExclamationMark className="text-negative bg-negative-muted size-4 rounded-full p-0.5" />
      )}
      Spread:
      <div className={isHighSpread ? 'text-negative' : 'text-text-secondary'}>
        {formatNumber(spreadFrac, {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        })}
      </div>
    </div>
  );
}
