import { BigDecimal } from '@vertex-protocol/client';
import {
  joinClassNames,
  NextImageSrc,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { getOrderSideLabel } from 'client/modules/trading/utils/getOrderSideLabel';
import { signDependentValue } from '@vertex-protocol/react-client';
import Image from 'next/image';

interface Props extends WithClassnames {
  isPerp: boolean;
  alwaysShowOrderDirection: boolean;
  amountForSide?: BigDecimal;
  iconSrc?: NextImageSrc;
  marketName?: string;
}

export function MarketInfoWithSide({
  className,
  marketName,
  iconSrc,
  amountForSide,
  isPerp,
  alwaysShowOrderDirection,
}: Props) {
  return (
    <div className={joinClassNames('flex items-center gap-x-2', className)}>
      {!!iconSrc && (
        <Image src={iconSrc} className="h-auto w-6" alt="Asset Icon" />
      )}
      <div className="flex flex-col gap-y-0.5">
        {!!marketName && (
          <div className="text-text-primary text-xs font-medium leading-4">
            {marketName}
          </div>
        )}
        {!!amountForSide && (
          <div
            className={joinClassNames(
              'text-2xs uppercase leading-3',
              signDependentValue(amountForSide, {
                positive: 'text-positive',
                negative: 'text-negative',
                zero: 'text-text-primary',
              }),
            )}
          >
            {getOrderSideLabel({
              isPerp,
              alwaysShowOrderDirection,
              amountForSide,
            })}
          </div>
        )}
      </div>
    </div>
  );
}
