import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ErrorTooltip } from '@vertex-protocol/web-ui';
import { Input, InputProps } from 'client/components/Input/Input';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import Image from 'next/image';
import React, { ReactNode } from 'react';

interface Props extends InputProps {
  estimatedStakeValueUsd: BigDecimal | undefined;
  error: ReactNode;
}

export const StakingDialogInput = React.forwardRef<
  HTMLInputElement,
  WithClassnames<Props>
>(function StakingInputBase(
  { className, error, estimatedStakeValueUsd, ...inputProps },
  ref,
) {
  return (
    <ErrorTooltip
      errorContent={error}
      contentWrapperClassName={joinClassNames(
        'isolate h-10',
        'rounded border',
        'divide-overlay-divider/10',
        'flex items-center',
        !!error
          ? 'border-negative'
          : 'focus-within:border-accent border-stroke',
        className,
      )}
    >
      <div className="flex h-full w-24 min-w-fit items-center gap-x-1.5 pl-2">
        <Image
          src={VRTX_TOKEN_INFO.icon.asset}
          alt={VRTX_TOKEN_INFO.symbol}
          height={18}
          width={18}
        />
        <span className="text-text-primary text-sm">
          {VRTX_TOKEN_INFO.symbol}
        </span>
      </div>
      <Input
        placeholder="0.00"
        type="number"
        {...inputProps}
        className={joinClassNames(
          'placeholder:text-disabled border-y-none text-text-primary h-full flex-1 border-l bg-transparent px-2 text-sm font-medium transition placeholder:font-medium',
          !!error ? 'text-negative' : 'text-text-primary',
        )}
        min={0}
        ref={ref}
      />
      <EstimatedCurrencyValueItem
        className="mr-2 text-xs"
        estimatedValueUsd={estimatedStakeValueUsd}
      />
    </ErrorTooltip>
  );
});
