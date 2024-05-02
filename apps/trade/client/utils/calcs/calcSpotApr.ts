import {
  calcBorrowRateForTimeRange,
  calcRealizedDepositRateForTimeRange,
  SpotProduct,
} from '@vertex-protocol/contracts';
import { TimeInSeconds } from '@vertex-protocol/utils';

export function calcDepositAPR(product: SpotProduct) {
  return calcRealizedDepositRateForTimeRange(product, TimeInSeconds.YEAR, 0.2);
}

export function calcBorrowAPR(product: SpotProduct) {
  return calcBorrowRateForTimeRange(product, TimeInSeconds.YEAR);
}
