import { BigDecimal } from '@vertex-protocol/utils';
import {
  joinClassNames,
  NextImageSrc,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { formatNumber } from '@vertex-protocol/react-client';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import Image from 'next/image';

interface Props extends WithClassnames {
  img: NextImageSrc;
  imgClassName: string;
  metricValueClassName: string;
  amount: BigDecimal | undefined;
}

export function BlitzPointsMetric({
  img,
  imgClassName,
  metricValueClassName,
  amount,
  className,
}: Props) {
  return (
    <div className={joinClassNames('flex items-center', className)}>
      <Image src={img} alt="points logo" className={imgClassName} />
      <span className={metricValueClassName}>
        {formatNumber(amount, {
          formatSpecifier: CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED,
        })}
      </span>
    </div>
  );
}
