import { BigDecimal } from '@vertex-protocol/client';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { CollateralSpotProduct } from '../types';

export type WithdrawErrorType =
  | 'invalid_input' // Form input is not valid
  | 'require_borrow' // Not enough deposits in Vertex, but user can borrow
  | 'max_exceeded' // user is trying to withdraw more than they can, even with borrows
  | 'vrtx_borrow' // user has borrows on and VRTX selected
  | 'under_min'; // user trying to withdraw less than min

export interface WithdrawFormValues extends LinkedPercentageAmountFormValues {
  productId: number;
  enableBorrows: boolean;
}

export interface WithdrawProduct extends CollateralSpotProduct {
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
