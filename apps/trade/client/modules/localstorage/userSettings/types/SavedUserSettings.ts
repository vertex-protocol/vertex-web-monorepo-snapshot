import { NavAccountPinID } from 'client/modules/localstorage/userSettings/types/navAccountPins';
import { SavedPortfolioUserSettings } from 'client/modules/localstorage/userSettings/types/SavedPortfolioUserSettings';
import { SavedTradingUserSettings } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { SavedUserProfile } from 'client/modules/userProfile/types';
import { PrivacySettings } from 'client/modules/privacy/types';
import { SavedSigningPreferenceBySubaccountKey } from 'client/modules/singleSignatureSessions/types';

export interface SavedUserSettings {
  profile: SavedUserProfile;
  navPins: NavAccountPinID[];
  trading: SavedTradingUserSettings;
  portfolio: SavedPortfolioUserSettings;
  favoriteMarketIds: number[];
  privacy: PrivacySettings;
  signingPreferenceBySubaccountKey: SavedSigningPreferenceBySubaccountKey;
}
