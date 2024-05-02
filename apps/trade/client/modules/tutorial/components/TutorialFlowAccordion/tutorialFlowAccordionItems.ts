import { UserTutorialFlowStepID } from 'client/modules/localstorage/userState/types/userTutorialFlowTypes';
import { clientEnv } from 'common/environment/clientEnv';

interface TutorialFlowAccordionItem {
  stepId: UserTutorialFlowStepID;
  triggerLabel: string;
  actionLabel: string;
  description: string;
}

const NOTIFICATION_ITEM: TutorialFlowAccordionItem = {
  stepId: 'set_notification_preferences',
  triggerLabel: 'Set notification preferences',
  actionLabel: 'Turn on',
  description: 'Enable notifications to receive real-time alerts.',
};

export const TUTORIAL_FLOW_ACCORDION_ITEMS: TutorialFlowAccordionItem[] = [
  {
    stepId: 'deposit_funds',
    triggerLabel: 'Deposit funds',
    actionLabel: 'Deposit now',
    description:
      'Deposit various collaterals to trade with. Deposits are made into non-custodial and audited smart contracts.',
  },
  {
    stepId: 'enable_1ct',
    triggerLabel: 'Enable one-click trading',
    actionLabel: 'Enable 1CT',
    description:
      'Trade fast and seamlessly with One-Click trading mode. Sign one approval transaction at the start of each trading session.',
  },
  {
    stepId: 'set_trading_preferences',
    triggerLabel: 'Set trading preferences',
    actionLabel: 'Customize',
    description:
      'Customize your trading console to be on the right or left. Adjust your market slippage tolerance.',
  },
  ...(clientEnv.base.brandName === 'vertex' ? [NOTIFICATION_ITEM] : []),
];
