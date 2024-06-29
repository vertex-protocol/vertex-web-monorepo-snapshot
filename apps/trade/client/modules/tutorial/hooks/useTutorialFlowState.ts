import { UserTutorialFlowStepID } from 'client/modules/localstorage/userState/types/userTutorialFlowTypes';
import { useSavedUserState } from 'client/modules/localstorage/userState/useSavedUserState';
import { useCallback } from 'react';

export function useTutorialFlowState() {
  const { savedUserState, setSavedUserState, didLoadPersistedValue } =
    useSavedUserState();

  const markStepAsComplete = useCallback(
    (step: UserTutorialFlowStepID) => {
      setSavedUserState((prev) => {
        if (prev.tutorial.completedSteps.includes(step)) return prev;
        prev.tutorial.completedSteps.push(step);
        return prev;
      });
    },
    [setSavedUserState],
  );

  const dismissFlow = useCallback(() => {
    setSavedUserState((prev) => {
      prev.tutorial.isDismissed = true;
      return prev;
    });
  }, [setSavedUserState]);

  return {
    tutorialFlowState: savedUserState.tutorial,
    markStepAsComplete,
    dismissFlow,
    didLoadPersistedValue,
  };
}
