import { ChainEnv } from '@vertex-protocol/client';
import { NavAccountPinID } from 'client/modules/localstorage/userSettings/types/navAccountPins';
import { SavedPortfolioUserSettings } from 'client/modules/localstorage/userSettings/types/SavedPortfolioUserSettings';
import { SavedTradingUserSettings } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { PrivacySettings } from 'client/modules/privacy/types';
import { SavedSigningPreferenceBySubaccountKey } from 'client/modules/singleSignatureSessions/types';
import { SubaccountProfile } from 'client/modules/subaccounts/types';

export interface SavedUserSettings {
  navPins: NavAccountPinID[];
  trading: SavedTradingUserSettings;
  portfolio: SavedPortfolioUserSettings;
  favoriteMarketIds: number[];
  privacy: PrivacySettings;
  signingPreferenceBySubaccountKey: SavedSigningPreferenceBySubaccountKey;
  profileBySubaccountKey: Record<string, SubaccountProfile | undefined>;
  selectedSubaccountNameByChainEnv: Partial<Record<ChainEnv, string>>;
}
