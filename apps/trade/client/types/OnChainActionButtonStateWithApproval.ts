import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

export type ApprovalButtonState =
  | 'approve_loading'
  | 'approve_success'
  | 'approve_idle';

export type OnChainActionButtonStateWithApproval =
  | BaseActionButtonState
  | ApprovalButtonState;
