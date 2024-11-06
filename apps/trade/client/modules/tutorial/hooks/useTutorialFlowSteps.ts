import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { UserTutorialFlowStepID } from 'client/modules/localstorage/userState/types/userTutorialFlowTypes';
import { useMemo } from 'react';

export interface UserTutorialFlowStep {
  id: UserTutorialFlowStepID;
  triggerLabel: string;
  actionLabel: string;
  description: string;
}

const NOTIFICATION_STEP: UserTutorialFlowStep = {
  id: 'set_notification_preferences',
  triggerLabel: 'Set notification preferences',
  actionLabel: 'Turn on',
  description: 'Enable notifications to receive real-time alerts.',
};

export function useTutorialFlowSteps() {
  const { isNotifiEnabled } = useEnabledFeatures();

  return useMemo((): UserTutorialFlowStep[] => {
    return [
      {
        id: 'deposit_funds',
        triggerLabel: 'Deposit funds',
        actionLabel: 'Deposit now',
        description:
          'Deposit various collaterals to trade with. Deposits are made into non-custodial and audited smart contracts.',
      },
      {
        id: 'enable_1ct',
        triggerLabel: 'Enable one-click trading',
        actionLabel: 'Enable 1CT',
        description:
          'Trade fast and seamlessly with One-Click trading mode. Sign one approval transaction at the start of each trading session.',
      },
      {
        id: 'set_trading_preferences',
        triggerLabel: 'Set trading preferences',
        actionLabel: 'Customize',
        description:
          'Customize your trading console to be on the right or left. Adjust your market slippage tolerance.',
      },
      ...(isNotifiEnabled ? [NOTIFICATION_STEP] : []),
    ];
  }, [isNotifiEnabled]);
}
