import { SavedUserState } from 'client/modules/localstorage/userState/types/SavedUserState';
import { cloneDeep } from 'lodash';
import { stateSchema } from 'client/modules/localstorage/userState/userStateSchema';
import { validateOrReset } from 'client/modules/localstorage/utils/zodValidators';

const DEFAULT_USER_STATE: SavedUserState = Object.freeze<SavedUserState>({
  onboardingComplete: false,
  dismissedDisclosures: [],
  tutorial: {
    isDismissed: false,
    completedSteps: [],
  },
  tradingSidebar: {
    isOpen: false,
    selectedWatchlistTabId: 'watchlist',
    selectedTabId: 'market_info',
  },
  fundingRatePeriod: '1h',
});

// See getUserSettingsWithDefaults for explanation of implementation
export function getUserStateWithDefaults(
  currentSaved: Partial<SavedUserState> | undefined,
): SavedUserState {
  const tutorialSchema = stateSchema.shape.tutorial;
  const sidebarSchema = stateSchema.shape.tradingSidebar;

  const withDefaults: SavedUserState = {
    onboardingComplete: validateOrReset(
      currentSaved?.onboardingComplete,
      DEFAULT_USER_STATE.onboardingComplete,
      stateSchema.shape.onboardingComplete,
    ),
    dismissedDisclosures: validateOrReset(
      currentSaved?.dismissedDisclosures,
      DEFAULT_USER_STATE.dismissedDisclosures,
      stateSchema.shape.dismissedDisclosures,
    ),
    tutorial: {
      isDismissed: validateOrReset(
        currentSaved?.tutorial?.isDismissed,
        DEFAULT_USER_STATE.tutorial.isDismissed,
        tutorialSchema.shape.isDismissed,
      ),
      completedSteps: validateOrReset(
        currentSaved?.tutorial?.completedSteps,
        DEFAULT_USER_STATE.tutorial.completedSteps,
        tutorialSchema.shape.completedSteps,
      ),
    },
    tradingSidebar: {
      isOpen: validateOrReset(
        currentSaved?.tradingSidebar?.isOpen,
        DEFAULT_USER_STATE.tradingSidebar.isOpen,
        sidebarSchema.shape.isOpen,
      ),
      selectedWatchlistTabId: validateOrReset(
        currentSaved?.tradingSidebar?.selectedWatchlistTabId,
        DEFAULT_USER_STATE.tradingSidebar.selectedWatchlistTabId,
        sidebarSchema.shape.selectedWatchlistTabId,
      ),
      selectedTabId: validateOrReset(
        currentSaved?.tradingSidebar?.selectedTabId,
        DEFAULT_USER_STATE.tradingSidebar.selectedTabId,
        sidebarSchema.shape.selectedTabId,
      ),
    },
    fundingRatePeriod: validateOrReset(
      currentSaved?.fundingRatePeriod,
      DEFAULT_USER_STATE.fundingRatePeriod,
      stateSchema.shape.fundingRatePeriod,
    ),
  };

  return cloneDeep(withDefaults);
}
