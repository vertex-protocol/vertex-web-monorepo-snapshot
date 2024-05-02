export type UserTutorialFlowStepID =
  | 'deposit_funds'
  | 'enable_1ct'
  | 'set_trading_preferences'
  | 'set_notification_preferences';

export interface UserTutorialFlowState {
  isDismissed: boolean;
  completedSteps: UserTutorialFlowStepID[];
}
