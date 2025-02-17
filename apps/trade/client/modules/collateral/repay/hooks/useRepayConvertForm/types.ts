import { SubaccountTx } from '@vertex-protocol/engine-client';
import { AnnotatedSpotMarket } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { InputValidatorFn } from '@vertex-protocol/web-common';

import { LatestMarketPrice } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { CollateralSpotProductSelectValue } from 'client/modules/collateral/types';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { UseFormReturn } from 'react-hook-form';

export type RepayConvertAmountInputErrorType =
  | 'invalid_input' // Form input is not valid
  | 'max_exceeded' // Trying to repay more than the max
  | 'invalid_size_increment';

export type RepayConvertFormErrorType =
  | RepayConvertAmountInputErrorType
  | 'not_borrowing' // Invalid repay product (not borrowing this product)
  | 'no_available_source'; // There are no available source products to repay the balance

export interface RepayConvertFormValues {
  // For product being repaid
  repayProductId: number;
  repayAmount: string;
  // Product being sold to repay
  sourceProductId: number | undefined;
}

export interface RepayConvertProductSelectValue
  extends CollateralSpotProductSelectValue {
  marketName: string;
  // Absolute
  amountBorrowed: BigDecimal;
  oraclePriceUsd: BigDecimal;
  marketPrices: LatestMarketPrice | undefined;
  decimalAdjustedVertexBalance: BigDecimal;
}

export interface UseRepayConvertForm {
  form: UseFormReturn<RepayConvertFormValues>;
  amountInputError: RepayConvertAmountInputErrorType | undefined;
  formError: RepayConvertFormErrorType | undefined;
  validateRepayAmount: InputValidatorFn<string, RepayConvertFormErrorType>;
  // Select
  selectedRepayProduct: RepayConvertProductSelectValue | undefined;
  selectedSourceProduct: RepayConvertProductSelectValue | undefined;
  availableRepayProducts: RepayConvertProductSelectValue[];
  availableSourceProducts: RepayConvertProductSelectValue[];
  estimateStateTxs: SubaccountTx[];
  // Source Product UI
  sourceAmount: BigDecimal | undefined;
  sourceAmountValueUsd: BigDecimal | undefined;
  // Repay Product UI
  repayAmountValueUsd: BigDecimal | undefined;
  disableMaxRepayButton: boolean;
  maxRepaySize: BigDecimal | undefined;
  sizeIncrement: BigDecimal | undefined;
  // Misc UI
  oracleConversionPrice: BigDecimal | undefined;
  isMaxRepayDismissibleOpen: boolean | undefined;
  buttonState: BaseActionButtonState;
  // Either repay or source, depending on whether we are selling / buying
  market: AnnotatedSpotMarket | undefined;
  // Handlers
  onMaxRepayClicked: () => void;
  onAmountBorrowingClicked: () => void;
  onSubmit: () => void;
}
