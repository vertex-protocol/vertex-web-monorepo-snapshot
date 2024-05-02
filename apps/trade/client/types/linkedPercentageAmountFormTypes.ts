// For common linked inputs, amounts can be specified as a percentage of some max amount, or in absolute amount terms
export type LinkedPercentageAmountSource = 'absolute' | 'percentage';

// A base set of form values for forms with linked percentage & amount fields
export interface LinkedPercentageAmountFormValues {
  amount: string;
  percentageAmount: number;
  amountSource: LinkedPercentageAmountSource;
}
