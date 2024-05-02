import { UserTutorialFlowStepID } from 'client/modules/localstorage/userState/types/userTutorialFlowTypes';
import { useSavedUserState } from 'client/modules/localstorage/userState/useSavedUserState';
import { useCallback } from 'react';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';

export function useTutorialFlowState() {
  const { savedUserState, setSavedUserState, didLoadPersistedValue } =
    useSavedUserState();
  const { trackEvent } = useAnalyticsContext();

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
    trackEvent({
      type: 'tutorial_flow',
      data: { tutorialStatus: 'dismissed' },
    });

    setSavedUserState((prev) => {
      prev.tutorial.isDismissed = true;
      return prev;
    });
  }, [trackEvent, setSavedUserState]);

  return {
    tutorialFlowState: savedUserState.tutorial,
    markStepAsComplete,
    dismissFlow,
    didLoadPersistedValue,
  };
}
