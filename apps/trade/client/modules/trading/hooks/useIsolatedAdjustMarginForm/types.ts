import { LinkedPercentageAmountSource } from 'client/types/linkedPercentageAmountFormTypes';

export type IsolatedAdjustMarginFormErrorType =
  | 'invalid_input'
  | 'add_max_exceeded'
  | 'remove_max_exceeded'
  | 'below_min';

export type IsolatedAdjustMarginFormValues = {
  amount: string;
  percentageAmount: number;
  adjustmentMode: IsolatedAdjustMarginMode;
  enableBorrows: boolean;
  amountSource: LinkedPercentageAmountSource;
};

export type IsolatedAdjustMarginMode = 'add' | 'remove';
