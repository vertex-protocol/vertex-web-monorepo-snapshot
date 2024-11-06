import { UserDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { TradingSidebarState } from 'client/modules/localstorage/userState/types/userTradingSidebarTypes';
import { UserTutorialFlowState } from 'client/modules/localstorage/userState/types/userTutorialFlowTypes';

export interface SavedUserState {
  onboardingComplete: boolean;
  dismissedDisclosures: UserDisclosureKey[];
  tutorial: UserTutorialFlowState;
  tradingSidebar: TradingSidebarState;
}
