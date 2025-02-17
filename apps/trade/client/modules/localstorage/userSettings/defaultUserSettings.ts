import { SavedUserSettings } from 'client/modules/localstorage/userSettings/types/SavedUserSettings';
import { settingsSchema } from 'client/modules/localstorage/userSettings/userSettingsSchema';
import { validateOrReset } from 'client/modules/localstorage/utils/zodValidators';
import { DEFAULT_ORDER_SLIPPAGE } from 'client/modules/trading/defaultOrderSlippage';
import { cloneDeep } from 'lodash';

const DEFAULT_USER_SETTINGS: SavedUserSettings =
  Object.freeze<SavedUserSettings>({
    favoriteMarketIds: [],
    navPins: ['accountValue'],
    portfolio: {
      enabledOptionalHistoryTabIds: [],
    },
    privacy: {
      areAccountValuesPrivate: false,
      isAddressPrivate: false,
    },
    profileBySubaccountKey: {},
    selectedSubaccountNameByChainEnv: {},
    signingPreferenceBySubaccountKey: {},
    trading: {
      consolePosition: 'right',
      leverageByProductId: {},
      marginMode: {
        default: 'cross',
        lastSelected: {},
      },
      orderbookTickSpacingMultiplierByProductId: {},
      showOrderbookTotalInQuote: false,
      spotLeverageEnabled: false,
      slippage: DEFAULT_ORDER_SLIPPAGE,
      enableTradingNotifications: true,
      enableTradingOrderLines: true,
      tpSlTriggerPriceType: 'oracle_price',
      selectedFilterByTradingTableTab: {
        positions: 'all',
        balances: 'all',
        openEngineOrders: 'all',
        openTriggerOrders: 'all',
        historicalTrades: 'all',
        realizedPnlEvents: 'all',
      },
    },
  });

/**
 * This is a relatively ugly implementation to ensure that we always have a "clean" user settings object.
 * We generally can't trust anything saved to localstorage, so this is a way for us to retrieve saved settings if they exist,
 * otherwise using defaults.
 *
 * This also guards against changes in the interface of `SavedUserSettings`. For example, if we remove a property from
 * the interface, then it's automatically cleaned up when the user uses the app again.
 */
export function getUserSettingsWithDefaults(
  currentSaved: Partial<SavedUserSettings> | undefined,
): SavedUserSettings {
  const portfolioSchema = settingsSchema.shape.portfolio;
  const privacySchema = settingsSchema.shape.privacy;
  const tradingSchema = settingsSchema.shape.trading;

  const withDefaults: SavedUserSettings = {
    favoriteMarketIds: validateOrReset(
      currentSaved?.favoriteMarketIds,
      DEFAULT_USER_SETTINGS.favoriteMarketIds,
      settingsSchema.shape.favoriteMarketIds,
    ),
    navPins: validateOrReset(
      currentSaved?.navPins,
      DEFAULT_USER_SETTINGS.navPins,
      settingsSchema.shape.navPins,
    ),
    portfolio: {
      enabledOptionalHistoryTabIds: validateOrReset(
        currentSaved?.portfolio?.enabledOptionalHistoryTabIds,
        DEFAULT_USER_SETTINGS.portfolio.enabledOptionalHistoryTabIds,
        portfolioSchema.shape.enabledOptionalHistoryTabIds,
      ),
    },
    privacy: {
      areAccountValuesPrivate: validateOrReset(
        currentSaved?.privacy?.areAccountValuesPrivate,
        DEFAULT_USER_SETTINGS.privacy.areAccountValuesPrivate,
        privacySchema.shape.areAccountValuesPrivate,
      ),
      isAddressPrivate: validateOrReset(
        currentSaved?.privacy?.isAddressPrivate,
        DEFAULT_USER_SETTINGS.privacy.isAddressPrivate,
        privacySchema.shape.isAddressPrivate,
      ),
    },
    profileBySubaccountKey: validateOrReset(
      currentSaved?.profileBySubaccountKey,
      DEFAULT_USER_SETTINGS.profileBySubaccountKey,
      settingsSchema.shape.profileBySubaccountKey,
    ),
    selectedSubaccountNameByChainEnv: validateOrReset(
      currentSaved?.selectedSubaccountNameByChainEnv,
      DEFAULT_USER_SETTINGS.selectedSubaccountNameByChainEnv,
      settingsSchema.shape.selectedSubaccountNameByChainEnv,
    ),
    signingPreferenceBySubaccountKey: validateOrReset(
      currentSaved?.signingPreferenceBySubaccountKey,
      DEFAULT_USER_SETTINGS.signingPreferenceBySubaccountKey,
      settingsSchema.shape.signingPreferenceBySubaccountKey,
    ),
    trading: {
      consolePosition: validateOrReset(
        currentSaved?.trading?.consolePosition,
        DEFAULT_USER_SETTINGS.trading.consolePosition,
        tradingSchema.shape.consolePosition,
      ),
      leverageByProductId: validateOrReset(
        currentSaved?.trading?.leverageByProductId,
        DEFAULT_USER_SETTINGS.trading.leverageByProductId,
        tradingSchema.shape.leverageByProductId,
      ),
      marginMode: validateOrReset(
        currentSaved?.trading?.marginMode,
        DEFAULT_USER_SETTINGS.trading.marginMode,
        tradingSchema.shape.marginMode,
      ),
      orderbookTickSpacingMultiplierByProductId: validateOrReset(
        currentSaved?.trading?.orderbookTickSpacingMultiplierByProductId,
        DEFAULT_USER_SETTINGS.trading.orderbookTickSpacingMultiplierByProductId,
        tradingSchema.shape.orderbookTickSpacingMultiplierByProductId,
      ),
      showOrderbookTotalInQuote: validateOrReset(
        currentSaved?.trading?.showOrderbookTotalInQuote,
        DEFAULT_USER_SETTINGS.trading.showOrderbookTotalInQuote,
        tradingSchema.shape.showOrderbookTotalInQuote,
      ),
      spotLeverageEnabled: validateOrReset(
        currentSaved?.trading?.spotLeverageEnabled,
        DEFAULT_USER_SETTINGS.trading.spotLeverageEnabled,
        tradingSchema.shape.spotLeverageEnabled,
      ),
      slippage: validateOrReset(
        currentSaved?.trading?.slippage,
        DEFAULT_USER_SETTINGS.trading.slippage,
        tradingSchema.shape.slippage,
      ),
      enableTradingNotifications: validateOrReset(
        currentSaved?.trading?.enableTradingNotifications,
        DEFAULT_USER_SETTINGS.trading.enableTradingNotifications,
        tradingSchema.shape.enableTradingNotifications,
      ),
      enableTradingOrderLines: validateOrReset(
        currentSaved?.trading?.enableTradingOrderLines,
        DEFAULT_USER_SETTINGS.trading.enableTradingOrderLines,
        tradingSchema.shape.enableTradingOrderLines,
      ),
      tpSlTriggerPriceType: validateOrReset(
        currentSaved?.trading?.tpSlTriggerPriceType,
        DEFAULT_USER_SETTINGS.trading.tpSlTriggerPriceType,
        tradingSchema.shape.tpSlTriggerPriceType,
      ),
      selectedFilterByTradingTableTab: validateOrReset(
        currentSaved?.trading?.selectedFilterByTradingTableTab,
        DEFAULT_USER_SETTINGS.trading.selectedFilterByTradingTableTab,
        tradingSchema.shape.selectedFilterByTradingTableTab,
      ),
    },
  };

  // We need to clone the object to ensure that we don't accidentally mutate the default object
  return cloneDeep(withDefaults);
}
