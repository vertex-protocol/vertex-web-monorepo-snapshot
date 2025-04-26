import { BigDecimal } from '@vertex-protocol/utils';
import { CollateralSpotProductSelectValue } from 'client/modules/collateral/types';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { OnChainActionButtonStateWithApproval } from 'client/types/OnChainActionButtonStateWithApproval';
// We do NOT check for max deposit based on user wallet balance because public RPCs can be unreliable, and we do not
// want to block users from depositing if the RPC is down
export type DepositErrorType =
  | 'invalid_input' // Form input is not valid
  | 'below_min'; // below minimum amount

export interface DepositFormValues extends LinkedPercentageAmountFormValues {
  productId: number;
}

export type DepositActionButtonState = OnChainActionButtonStateWithApproval;

export interface DepositProductSelectValue
  extends CollateralSpotProductSelectValue {
  tokenDecimals: number;
  decimalAdjustedVertexBalance: BigDecimal;
  decimalAdjustedWalletBalance: BigDecimal;
  decimalAdjustedMinimumInitialDepositAmount: BigDecimal | undefined;
  oraclePriceUsd: BigDecimal;
}

export type DepositInfoCardType =
  | 'wrap_weth'
  | 'vrtx_margin'
  | 'blast_native_yield'
  | 'wrap_wmnt'
  | 'wrap_wsei'
  | 'wrap_ws'
  | 'wrap_wavax';
