import { BigDecimal } from '@vertex-protocol/utils';
import { signDependentValue } from '@vertex-protocol/react-client';

type SideProps =
  | {
      amountForSide: BigDecimal;
      isLong?: never;
    }
  | { amountForSide?: never; isLong: boolean };

type Params = {
  isPerp: boolean;
  alwaysShowOrderDirection: boolean;
} & SideProps;

/**
 * Get the relevant side label based on the input arguments;
 * @param isPerp - Either a perp or spot product
 * @param alwaysShowOrderDirection - Force return 'Buy/Long' or 'Sell/Short' for all perp products
 * @param amountForSide - Signed order amount used to determine the side label *
 * @returns 'Buy/Long' | 'Long' | 'Buy' | 'Sell/Short' | 'Short' | 'Sell' | '-'
 **/
export function getOrderSideLabel({
  isPerp,
  alwaysShowOrderDirection,
  amountForSide,
  isLong,
}: Params) {
  const longText = (() => {
    if (!isPerp) {
      return 'Buy';
    }
    if (alwaysShowOrderDirection) {
      return 'Buy/Long';
    }
    return 'Long';
  })();
  const shortText = (() => {
    if (!isPerp) {
      return 'Sell';
    }
    if (alwaysShowOrderDirection) {
      return 'Sell/Short';
    }
    return 'Short';
  })();

  if (amountForSide != null) {
    return signDependentValue(amountForSide, {
      positive: longText,
      negative: shortText,
      zero: '-',
    });
  }

  return isLong ? longText : shortText;
}
