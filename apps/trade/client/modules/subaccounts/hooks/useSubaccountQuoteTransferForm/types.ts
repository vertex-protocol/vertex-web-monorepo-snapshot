import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';

export type SubaccountQuoteTransferErrorType =
  | 'invalid_input'
  | 'below_min'
  | 'max_exceeded';

export interface SubaccountQuoteTransferFormValues
  extends LinkedPercentageAmountFormValues {
  senderSubaccountName: string;
  recipientSubaccountName: string;
  enableBorrows: boolean;
}
