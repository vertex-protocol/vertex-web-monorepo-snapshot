import { SavedUserState } from 'client/modules/localstorage/userState/types/SavedUserState';
import { cloneDeep } from 'lodash';

const DEFAULT_USER_STATE: SavedUserState = Object.freeze<SavedUserState>({
  onboardingComplete: false,
  dismissedDisclosures: [],
  tutorial: {
    isDismissed: false,
    completedSteps: [],
  },
  marketWatchlist: {
    isOpen: false,
    selectedTabId: 'watchlist',
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
    marketWatchlist: {
      isOpen:
        currentSaved?.marketWatchlist?.isOpen ??
        DEFAULT_USER_STATE.marketWatchlist.isOpen,
      selectedTabId:
        currentSaved?.marketWatchlist?.selectedTabId ??
        DEFAULT_USER_STATE.marketWatchlist.selectedTabId,
    },
  };

  return cloneDeep(withDefaults);
}
