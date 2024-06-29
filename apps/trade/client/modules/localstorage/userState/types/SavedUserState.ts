import { UserDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { UserTutorialFlowState } from 'client/modules/localstorage/userState/types/userTutorialFlowTypes';
import { MarketWatchlistState } from 'client/modules/localstorage/userState/types/userMarketWatchlistTypes';

export interface SavedUserState {
  onboardingComplete: boolean;
  dismissedDisclosures: UserDisclosureKey[];
  tutorial: UserTutorialFlowState;
  marketWatchlist: MarketWatchlistState;
}
