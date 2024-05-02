import { UserDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { UserTutorialFlowState } from 'client/modules/localstorage/userState/types/userTutorialFlowTypes';

export interface SavedUserState {
  onboardingComplete: boolean;
  dismissedDisclosures: UserDisclosureKey[];
  tutorial: UserTutorialFlowState;
}
