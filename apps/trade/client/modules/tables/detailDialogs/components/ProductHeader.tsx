import { signDependentValue } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { NextImageSrc, joinClassNames } from '@vertex-protocol/web-common';
import { getOrderSideLabel } from 'client/modules/trading/utils/getOrderSideLabel';
import Image from 'next/image';

interface Props {
  productName: string;
  iconSrc: NextImageSrc;
  isPerp: boolean;
  amountForSide?: BigDecimal;
}

export function ProductHeader({
  productName,
  iconSrc,
  isPerp,
  amountForSide,
}: Props) {
  return (
    <div className="flex items-center gap-x-2">
      <Image src={iconSrc} width={24} height={24} alt="Asset Icon" />
      <div className="flex items-center gap-x-1.5 text-sm">
        <div className="text-text-primary">{productName}</div>
        {amountForSide && (
          <div
            className={joinClassNames(
              'uppercase',
              signDependentValue(amountForSide, {
                positive: 'text-positive',
                negative: 'text-negative',
                zero: 'text-text-primary',
              }),
            )}
          >
            {getOrderSideLabel({
              isPerp,
              alwaysShowOrderDirection: false,
              amountForSide,
            })}
          </div>
        )}
      </div>
    </div>
  );
}
