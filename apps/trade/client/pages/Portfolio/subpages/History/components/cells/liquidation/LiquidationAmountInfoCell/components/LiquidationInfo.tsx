import { ProductEngineType } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import {
  joinClassNames,
  NextImageSrc,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { LiquidationProductInfo } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LiquidationProductInfo';
import { LiquidationSizeInfo } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/LiquidationAmountInfoCell/components/LiquidationSizeInfo';

interface LiquidationInfoProps extends WithClassnames {
  iconSrc: NextImageSrc;
  symbol: string;
  productType: ProductEngineType;
  productLabel: string;
  sizeFormatSpecifier: string;
  amountLiquidated: BigDecimal;
  amountLiquidatedValueUsd: BigDecimal;
}

export function LiquidationInfo({
  className,
  iconSrc,
  symbol,
  productType,
  productLabel,
  sizeFormatSpecifier,
  amountLiquidated,
  amountLiquidatedValueUsd,
}: LiquidationInfoProps) {
  return (
    <div className={joinClassNames('grid w-full grid-cols-2', className)}>
      <LiquidationProductInfo
        productType={productType}
        productLabel={productLabel}
        iconSrc={iconSrc}
        isLong={amountLiquidated.isPositive()}
      />
      <LiquidationSizeInfo
        amountLiquidated={amountLiquidated}
        amountFormatSpecifier={sizeFormatSpecifier}
        amountLiquidatedValueUsd={amountLiquidatedValueUsd}
        symbol={symbol}
      />
    </div>
  );
}
