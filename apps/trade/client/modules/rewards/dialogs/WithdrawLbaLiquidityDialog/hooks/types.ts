import { BigDecimal } from '@vertex-protocol/utils';
import { InputValidatorFn } from '@vertex-protocol/web-common';
import { OnFractionSelectedHandler } from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { PairMetadata } from 'client/modules/pools/types';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { UseFormReturn } from 'react-hook-form';

export type WithdrawLbaLiquidityFormValues = LinkedPercentageAmountFormValues;
export type WithdrawLbaLiquidityErrorType = 'invalid_input' | 'max_exceeded';

interface AccountState {
  totalLiquidityUsd: BigDecimal;
  unlockedLiquidityUsd: BigDecimal;
  unlockedLpTokens: BigDecimal;
}

interface MarketState {
  lpTokenValue: BigDecimal;
}

interface EstimatedReceiveAmounts {
  vrtx: BigDecimal;
  usdc: BigDecimal;
  valueUsd: BigDecimal | undefined;
  // Amount USDC for 1 unit of VRTX
  conversionRate: BigDecimal;
}

export interface UseWithdrawLbaLiquidityForm {
  form: UseFormReturn<WithdrawLbaLiquidityFormValues>;
  buttonState: BaseActionButtonState;
  validPercentageAmount: number | undefined;
  formError: WithdrawLbaLiquidityErrorType | undefined;
  validateAmount: InputValidatorFn<string, WithdrawLbaLiquidityErrorType>;
  onFractionSelected: OnFractionSelectedHandler;
  onSubmit: () => void;
  pairMetadata: PairMetadata;
  // Data, all decimal adjusted
  accountState: AccountState | undefined;
  marketState: MarketState | undefined;
  estimatedReceiveAmounts: EstimatedReceiveAmounts | undefined;
  priceIncrement: BigDecimal | undefined;
}
