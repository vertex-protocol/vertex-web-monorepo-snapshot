import { BaseActionButtonState } from './BaseActionButtonState';

export type OnChainActionButtonStateWithApproval =
  | BaseActionButtonState
  | 'approve_loading'
  | 'approve_success'
  | 'approve_idle';
