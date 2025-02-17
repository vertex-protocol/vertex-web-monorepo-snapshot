import { BigDecimal } from '@vertex-protocol/client';
import { CollateralSpotProductSelectValue } from 'client/modules/collateral/types';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';

export type WithdrawErrorType =
  | 'invalid_input' // Form input is not valid
  | 'max_exceeded' // user is trying to withdraw more than they can, even with borrows
  | 'vrtx_borrow' // user has borrows on and VRTX selected
  | 'below_min'; // user trying to withdraw less than min

export interface WithdrawFormValues extends LinkedPercentageAmountFormValues {
  productId: number;
  enableBorrows: boolean;
}

export interface WithdrawProductSelectValue
  extends CollateralSpotProductSelectValue {
  oraclePriceUsd: BigDecimal;
  tokenDecimals: number;
  decimalAdjustedVertexBalance: BigDecimal;
  decimalAdjustedWalletBalance: BigDecimal;
  fee: {
    // amount of token
    amount: BigDecimal;
    // dollar value for fee amount
    valueUsd: BigDecimal;
  };
}
