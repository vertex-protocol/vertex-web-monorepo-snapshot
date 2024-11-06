import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useRunOnceOnCondition } from 'client/hooks/util/useRunOnceOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { UserTutorialFlowStepID } from 'client/modules/localstorage/userState/types/userTutorialFlowTypes';
import { useTutorialFlowState } from 'client/modules/tutorial/hooks/useTutorialFlowState';
import {
  UserTutorialFlowStep,
  useTutorialFlowSteps,
} from 'client/modules/tutorial/hooks/useTutorialFlowSteps';
import { atom, useAtom } from 'jotai';
import { differenceWith } from 'lodash';
import { useMemo, useState } from 'react';

export interface UseUserTutorialFlow {
  steps: UserTutorialFlowStep[];
  performStep: (stepId: UserTutorialFlowStepID) => void;
  skipStep: (stepId: UserTutorialFlowStepID) => void;
  onDismissFlow: () => void;
  setActiveStepId: (stepId: UserTutorialFlowStepID) => void;
  setIsExpanded: (open: boolean) => void;
  isExpanded: boolean;
  isCompleted: boolean;
  activeStepId: UserTutorialFlowStepID | undefined;
  completedStepIds: UserTutorialFlowStepID[];
  shouldShowTutorialFlow: boolean;
}

// We need an atom here to persist open/close state between page nav
const isExpandedAtom = atom(false);

export function useUserTutorialFlow(): UseUserTutorialFlow {
  const isConnected = useIsConnected();
  const tutorialFlowSteps = useTutorialFlowSteps();
  const {
    tutorialFlowState: { completedSteps: completedStepIds, isDismissed },
    markStepAsComplete,
    dismissFlow,
    didLoadPersistedValue,
  } = useTutorialFlowState();
  const { show } = useDialog();

  const [isExpanded, setIsExpanded] = useAtom(isExpandedAtom);
  const [activeStepId, setActiveStepId] = useState<UserTutorialFlowStepID>();

  const shouldShowTutorialFlow =
    didLoadPersistedValue && isConnected && !isDismissed;

  // If there is no difference between the two arrays, then we know the tutorial flow has been completed
  const isCompleted = useMemo(() => {
    return (
      differenceWith(
        tutorialFlowSteps,
        completedStepIds,
        (step, id) => step.id === id,
      ).length === 0
    );
  }, [tutorialFlowSteps, completedStepIds]);

  // Can also be used for 'Skip' action function
  const completeStep = (currentStepId: UserTutorialFlowStepID) => {
    markStepAsComplete(currentStepId);
    const firstIncompleteStep = tutorialFlowSteps.find(
      // Assumes the current step is completed
      (step) =>
        step.id !== currentStepId && !completedStepIds.includes(step.id),
    );

    if (firstIncompleteStep) {
      setActiveStepId(firstIncompleteStep.id);
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
        show({
          type: 'settings',
          params: {},
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
      (step) => !completedStepIds.includes(step.id),
    );
    if (firstIncompleteStep) {
      setActiveStepId(firstIncompleteStep.id);
    }
  });

  return {
    steps: tutorialFlowSteps,
    performStep,
    skipStep: completeStep,
    onDismissFlow: dismissFlow,
    setActiveStepId,
    setIsExpanded,
    isExpanded,
    isCompleted,
    completedStepIds,
    activeStepId: activeStepId,
    shouldShowTutorialFlow,
  };
}
