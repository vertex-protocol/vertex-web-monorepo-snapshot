import { SharedProductMetadata, Token } from '@vertex-protocol/react-client';
import { InputValidatorFn } from '@vertex-protocol/web-common';

export interface PairMetadata {
  base: SharedProductMetadata;
  quote: Token;
}

export type ProvideLiquidityErrorType =
  | 'invalid_input' // Form input is not valid
  | 'max_exceeded'; // Form input is greater than max available

export type WithdrawLiquidityErrorType =
  | 'invalid_input' // Form input is not valid
  | 'max_exceeded'; // Form input is greater than max available;

export interface ProvideFormValidators {
  validateBaseAmount: InputValidatorFn<string, ProvideLiquidityErrorType>;
  validateQuoteAmount: InputValidatorFn<string, ProvideLiquidityErrorType>;
}

export interface WithdrawFormValidators {
  validateLpAmount: InputValidatorFn<string, WithdrawLiquidityErrorType>;
}
