import { z } from 'zod';
import { SavedUserState } from 'client/modules/localstorage/userState/types/SavedUserState';
import { USER_TUTORIAL_FLOW_STEP_IDS } from 'client/modules/localstorage/userState/types/userTutorialFlowTypes';
import {
  TRADING_SIDEBAR_WATCHLIST_TAB_IDS,
  TRADING_SIDEBAR_TAB_IDS,
} from 'client/modules/localstorage/userState/types/userTradingSidebarTypes';

// Make dismissedDisclosures array more general so that removal of obsolete dismiss keys doesn't invalidate entire array
interface SavedUserStateSchema
  extends Omit<SavedUserState, 'dismissedDisclosures'> {
  dismissedDisclosures: string[];
}

export const stateSchema = z.object({
  onboardingComplete: z.boolean(),
  dismissedDisclosures: z.array(z.string()),
  tutorial: z.object({
    isDismissed: z.boolean(),
    completedSteps: z.array(z.enum(USER_TUTORIAL_FLOW_STEP_IDS)),
  }),
  tradingSidebar: z.object({
    isOpen: z.boolean(),
    selectedWatchlistTabId: z.enum(TRADING_SIDEBAR_WATCHLIST_TAB_IDS),
    selectedTabId: z.enum(TRADING_SIDEBAR_TAB_IDS),
  }),
}) satisfies z.ZodType<SavedUserStateSchema>;
