import { BigDecimal } from '@vertex-protocol/utils';
import { InputValidatorFn } from '@vertex-protocol/web-common';
import { OnFractionSelectedHandler } from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { EstimatedBridgeRoute } from 'client/modules/collateral/bridge/hooks/query/useEstimatedBridgeRoute';
import {
  BridgeChainSelectValue,
  BridgeTokenSelectValue,
  DestinationBridgeTokenSelectValue,
} from 'client/modules/collateral/bridge/types';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { UseFormReturn } from 'react-hook-form';

export interface BridgeFormValues extends LinkedPercentageAmountFormValues {
  sourceChainId: number;
  sourceTokenAddress: string;
  destinationTokenAddress: string;
}

export type BridgeFormErrorType =
  | 'invalid_input'
  | 'max_exceeded'
  | 'below_min';

export type BridgeFormActionButtonState =
  | BaseActionButtonState
  | 'estimating_route'
  | 'estimation_error'
  | 'requires_switch_connected_chain'
  | 'switching_chain';

export interface UseBridgeForm {
  // Global Form state
  form: UseFormReturn<BridgeFormValues>;
  formError: BridgeFormErrorType | undefined;
  isInitialDeposit: boolean;
  buttonState: BridgeFormActionButtonState;
  estimatedBridgeRoute: EstimatedBridgeRoute | undefined;
  // Inputs
  validPercentageAmount: number | undefined;
  selectedSourceChain: BridgeChainSelectValue | undefined;
  selectedSourceToken: BridgeTokenSelectValue | undefined;
  sourceTokenBalance: BigDecimal | undefined;
  selectedSourceAmount: BigDecimal | undefined;
  selectedDestinationToken: DestinationBridgeTokenSelectValue | undefined;
  minimumInitialDepositAmount: BigDecimal | undefined;
  estimatedSourceValueUsd: BigDecimal | undefined;
  // Data
  allSourceChains: BridgeChainSelectValue[];
  allSourceTokens: BridgeTokenSelectValue[];
  allDestinationTokens: DestinationBridgeTokenSelectValue[];
  // Validation
  validateAmount: InputValidatorFn<string>;
  // Handlers
  onMaxAmountSelected: () => void;
  onFractionSelected: OnFractionSelectedHandler;

  onSubmit(): void;
}
