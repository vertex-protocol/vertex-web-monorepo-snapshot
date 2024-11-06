export const USER_TUTORIAL_FLOW_STEP_IDS = [
  'deposit_funds',
  'enable_1ct',
  'set_trading_preferences',
  'set_notification_preferences',
] as const;

export type UserTutorialFlowStepID =
  (typeof USER_TUTORIAL_FLOW_STEP_IDS)[number];

export interface UserTutorialFlowState {
  isDismissed: boolean;
  completedSteps: UserTutorialFlowStepID[];
}
