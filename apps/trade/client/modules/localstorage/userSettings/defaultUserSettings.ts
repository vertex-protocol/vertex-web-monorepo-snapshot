import { SavedUserSettings } from 'client/modules/localstorage/userSettings/types/SavedUserSettings';
import { DEFAULT_ORDER_SLIPPAGE } from 'client/modules/trading/defaultOrderSlippage';
import { ProfileAvatar } from 'client/modules/userProfile/types';
import { cloneDeep } from 'lodash';
import { isValidProfileAvatar } from './userSettingValidators';

const DEFAULT_USER_SETTINGS: SavedUserSettings =
  Object.freeze<SavedUserSettings>({
    navPins: ['accountValue'],
    profile: {
      avatar: {
        type: 'default',
      },
      username: '',
    },
    trading: {
      consolePosition: 'right',
      leverageByProductId: {},
      orderbookTickSpacingMultiplierByProductId: {},
      showOrderbookTotalInQuote: false,
      spotLeverageEnabled: false,
      marketSlippageFraction: 'auto',
      slippage: DEFAULT_ORDER_SLIPPAGE,
      enableTradingNotifications: true,
      enableTradingOrderLines: true,
      tpSlTriggerPriceType: 'oracle_price',
    },
    portfolio: {
      enabledOptionalHistoryTabIds: [],
    },
    favoriteMarketIds: [],
    privacy: {
      areAccountValuesPrivate: false,
      isAddressPrivate: false,
    },
    signingPreferenceBySubaccountKey: {},
  });

/**
 * This is a relatively ugly implementation to ensure that we always have a "clean" user settings object.
 * We generally can't trust anything saved to localstorage, so this is a way for us to retrieve saved settings if they exist,
 * otherwise using defaults.
 *
 * This also guards against changes in the interface of `SavedUserSettings`. For example, if we remove a property from
 * the interface, then it's automatically cleaned up when the user uses the app again.
 *
 * @param currentSaved
 */
export function getUserSettingsWithDefaults(
  currentSaved: Partial<SavedUserSettings> | undefined,
): SavedUserSettings {
  const savedAvatar = currentSaved?.profile?.avatar;
  const profileAvatar: ProfileAvatar = isValidProfileAvatar(savedAvatar)
    ? savedAvatar
    : DEFAULT_USER_SETTINGS.profile.avatar;

  const withDefaults: SavedUserSettings = {
    profile: {
      avatar: profileAvatar,
      username:
        currentSaved?.profile?.username ??
        DEFAULT_USER_SETTINGS.profile.username,
    },
    navPins: currentSaved?.navPins ?? DEFAULT_USER_SETTINGS.navPins,
    trading: {
      consolePosition:
        currentSaved?.trading?.consolePosition ??
        DEFAULT_USER_SETTINGS.trading.consolePosition,
      enableTradingNotifications:
        currentSaved?.trading?.enableTradingNotifications ??
        DEFAULT_USER_SETTINGS.trading.enableTradingNotifications,
      enableTradingOrderLines:
        currentSaved?.trading?.enableTradingOrderLines ??
        DEFAULT_USER_SETTINGS.trading.enableTradingOrderLines,
      leverageByProductId: {
        ...DEFAULT_USER_SETTINGS.trading.leverageByProductId,
        ...currentSaved?.trading?.leverageByProductId,
      },
      orderbookTickSpacingMultiplierByProductId: {
        ...DEFAULT_USER_SETTINGS.trading
          .orderbookTickSpacingMultiplierByProductId,
        ...currentSaved?.trading?.orderbookTickSpacingMultiplierByProductId,
      },
      showOrderbookTotalInQuote:
        currentSaved?.trading?.showOrderbookTotalInQuote ??
        DEFAULT_USER_SETTINGS.trading.showOrderbookTotalInQuote,
      spotLeverageEnabled:
        currentSaved?.trading?.spotLeverageEnabled ??
        DEFAULT_USER_SETTINGS.trading.spotLeverageEnabled,
      tpSlTriggerPriceType:
        currentSaved?.trading?.tpSlTriggerPriceType ??
        DEFAULT_USER_SETTINGS.trading.tpSlTriggerPriceType,
      marketSlippageFraction:
        currentSaved?.trading?.marketSlippageFraction ??
        DEFAULT_USER_SETTINGS.trading.marketSlippageFraction,
      slippage: {
        ...DEFAULT_USER_SETTINGS.trading.slippage,
        ...currentSaved?.trading?.slippage,
      },
    },
    portfolio: {
      enabledOptionalHistoryTabIds:
        currentSaved?.portfolio?.enabledOptionalHistoryTabIds ??
        DEFAULT_USER_SETTINGS.portfolio.enabledOptionalHistoryTabIds,
    },
    favoriteMarketIds:
      currentSaved?.favoriteMarketIds ??
      DEFAULT_USER_SETTINGS.favoriteMarketIds,
    privacy: {
      areAccountValuesPrivate:
        currentSaved?.privacy?.areAccountValuesPrivate ??
        DEFAULT_USER_SETTINGS.privacy.areAccountValuesPrivate,
      isAddressPrivate:
        currentSaved?.privacy?.isAddressPrivate ??
        DEFAULT_USER_SETTINGS.privacy.isAddressPrivate,
    },
    signingPreferenceBySubaccountKey: {
      ...DEFAULT_USER_SETTINGS.signingPreferenceBySubaccountKey,
      ...currentSaved?.signingPreferenceBySubaccountKey,
    },
  };

  // We need to clone the object to ensure that we don't accidentally mutate the default object
  return cloneDeep(withDefaults);
}
