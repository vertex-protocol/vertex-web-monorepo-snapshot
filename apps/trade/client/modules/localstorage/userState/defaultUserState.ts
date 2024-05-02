import { cloneDeep } from 'lodash';
import { SavedUserState } from 'client/modules/localstorage/userState/types/SavedUserState';

const DEFAULT_USER_STATE: SavedUserState = Object.freeze<SavedUserState>({
  onboardingComplete: false,
  dismissedDisclosures: [],
  tutorial: {
    isDismissed: false,
    completedSteps: [],
  },
});

// See getUserSettingsWithDefaults for explanation of implementation
export function getUserStateWithDefaults(
  currentSaved: Partial<SavedUserState> | undefined,
): SavedUserState {
  const withDefaults: SavedUserState = {
    onboardingComplete:
      currentSaved?.onboardingComplete ?? DEFAULT_USER_STATE.onboardingComplete,
    dismissedDisclosures:
      currentSaved?.dismissedDisclosures ??
      DEFAULT_USER_STATE.dismissedDisclosures,
    tutorial: {
      isDismissed:
        currentSaved?.tutorial?.isDismissed ??
        DEFAULT_USER_STATE.tutorial.isDismissed,
      completedSteps:
        currentSaved?.tutorial?.completedSteps ??
        DEFAULT_USER_STATE.tutorial.completedSteps,
    },
  };

  return cloneDeep(withDefaults);
}
