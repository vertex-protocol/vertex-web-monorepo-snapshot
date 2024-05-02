import { SubaccountTx } from '@vertex-protocol/engine-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { InputValidatorFn } from '@vertex-protocol/web-common';
import { LatestMarketPrice } from 'client/hooks/query/markets/types';
import { CollateralSpotProduct } from 'client/modules/collateral/types';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { AnnotatedSpotMarket } from 'common/productMetadata/types';
import { UseFormReturn } from 'react-hook-form';

export type RepayConvertErrorType =
  | 'invalid_input' // Form input is not valid
  | 'not_borrowing' // Invalid repay product (not borrowing this product)
  | 'no_available_source' // There are no available source products to repay the balance
  | 'max_exceeded'; // Trying to repay more than the max

export interface RepayConvertFormValues {
  // For product being repaid
  repayProductId: number;
  repayAmount: string;
  // Product being sold to repay
  sourceProductId: number | undefined;
}

export interface RepayConvertProduct extends CollateralSpotProduct {
  marketName: string;
  // Absolute
  amountBorrowed: BigDecimal;
  oraclePriceUsd: BigDecimal;
  marketPrices: LatestMarketPrice | undefined;
  decimalAdjustedVertexBalance: BigDecimal;
}

export interface UseRepayConvertForm {
  form: UseFormReturn<RepayConvertFormValues>;
  formError: RepayConvertErrorType | undefined;
  validateRepayAmount: InputValidatorFn<string, RepayConvertErrorType>;
  // Select
  selectedRepayProduct: RepayConvertProduct | undefined;
  selectedSourceProduct: RepayConvertProduct | undefined;
  availableRepayProducts: RepayConvertProduct[];
  availableSourceProducts: RepayConvertProduct[];
  estimateStateTxs: SubaccountTx[];
  // Source Product UI
  sourceAmount: BigDecimal | undefined;
  sourceAmountValueUsd: BigDecimal | undefined;
  // Repay Product UI
  repayAmountValueUsd: BigDecimal | undefined;
  disableRepayAmountInput: boolean;
  disableMaxRepayButton: boolean;
  maxRepaySize: BigDecimal | undefined;
  // Misc UI
  oracleConversionPrice: BigDecimal | undefined;
  isMaxRepayDismissibleOpen: boolean | undefined;
  buttonState: BaseActionButtonState;
  // Either repay or source, depending on whether we are selling / buying
  market: AnnotatedSpotMarket | undefined;
  // Handlers
  onMaxRepayClicked: () => void;
  onSubmit: () => void;
}
