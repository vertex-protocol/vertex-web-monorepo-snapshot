import { useRunOnceOnCondition } from 'client/hooks/util/useRunOnceOnCondition';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { UserTutorialFlowStepID } from 'client/modules/localstorage/userState/types/userTutorialFlowTypes';
import { atom, useAtom } from 'jotai';
import { difference } from 'lodash';
import { useMemo, useState } from 'react';
import { TUTORIAL_FLOW_ACCORDION_ITEMS } from '../components/TutorialFlowAccordion/tutorialFlowAccordionItems';
import { useTutorialFlowState } from './useTutorialFlowState';

export interface UseUserTutorialFlow {
  performStep: (step: UserTutorialFlowStepID) => void;
  skipStep: (step: UserTutorialFlowStepID) => void;
  onDismissFlow: () => void;
  setActiveStep: (step: UserTutorialFlowStepID) => void;
  setIsExpanded: (open: boolean) => void;
  isExpanded: boolean;
  isCompleted: boolean;
  activeStep: UserTutorialFlowStepID | undefined;
  completedSteps: UserTutorialFlowStepID[];
}

// We need an atom here to persist open/close state between page nav
const isExpandedAtom = atom(true);

export function useUserTutorialFlow(): UseUserTutorialFlow {
  const { trackEvent } = useAnalyticsContext();
  const { show } = useDialog();

  const [isExpanded, setIsExpanded] = useAtom(isExpandedAtom);
  const [activeStep, setActiveStep] = useState<UserTutorialFlowStepID>();

  const {
    tutorialFlowState,
    markStepAsComplete,
    dismissFlow,
    didLoadPersistedValue,
  } = useTutorialFlowState();

  const { completedSteps } = tutorialFlowState;

  // A complete array of steps in the tutorial flow
  const tutorialFlowSteps = TUTORIAL_FLOW_ACCORDION_ITEMS.map(
    (step) => step.stepId,
  );

  // If there is no difference between the two arrays, then we know the tutorial flow has been completed
  const isCompleted = useMemo(() => {
    return difference(tutorialFlowSteps, completedSteps).length === 0;
  }, [tutorialFlowSteps, completedSteps]);

  // Can also be used for 'Skip' action function
  const completeStep = (currentStep: UserTutorialFlowStepID) => {
    markStepAsComplete(currentStep);
    const firstIncompleteStep = tutorialFlowSteps.find(
      // Assumes the current step is completed
      (step) => step !== currentStep && !completedSteps.includes(step),
    );

    if (firstIncompleteStep) {
      setActiveStep(firstIncompleteStep);
    } else {
      // Tracks if a user completed tutorial flow
      trackEvent({
        type: 'tutorial_flow',
        data: { tutorialStatus: 'completed' },
      });
    }
  };

  // Execute action function for currentStep
  const performStep = (currentStep: UserTutorialFlowStepID) => {
    switch (currentStep) {
      case 'deposit_funds':
        show({
          type: 'deposit',
          params: {},
        });
        break;
      case 'enable_1ct':
        show({
          type: 'signature_mode_settings',
          params: {},
        });
        break;
      case 'set_trading_preferences':
        // Show settings
        show({
          type: 'control_center',
          params: { initialShowSettingsContent: true },
        });

        break;
      case 'set_notification_preferences':
        show({
          type: 'notifi_settings',
          params: {},
        });
        break;
    }
    completeStep(currentStep);
  };

  // Once the persisted value has loaded from LS, set active step to first incomplete step
  useRunOnceOnCondition(didLoadPersistedValue, () => {
    const firstIncompleteStep = tutorialFlowSteps.find(
      (step) => !completedSteps.includes(step),
    );
    if (firstIncompleteStep) {
      setActiveStep(firstIncompleteStep);
    }
  });

  return {
    performStep,
    skipStep: completeStep,
    onDismissFlow: dismissFlow,
    setActiveStep,
    setIsExpanded,
    isExpanded,
    isCompleted,
    completedSteps,
    activeStep,
  };
}
