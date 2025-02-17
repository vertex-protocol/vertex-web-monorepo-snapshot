import { ALL_CHAIN_ENVS } from '@vertex-protocol/client';
import { NAV_ACCOUNT_PIN_STORAGE_IDS } from 'client/modules/localstorage/userSettings/types/navAccountPins';
import { SavedPortfolioUserSettings } from 'client/modules/localstorage/userSettings/types/SavedPortfolioUserSettings';
import { SavedUserSettings } from 'client/modules/localstorage/userSettings/types/SavedUserSettings';
import {
  MARGIN_MODES_TYPES,
  MarginModeSettings,
  OrderSlippageSettings,
  SavedTradingUserSettings,
  TRADING_CONSOLE_POSITIONS,
} from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { isValidProfileAvatar } from 'client/modules/localstorage/userSettings/userSettingValidators';
import {
  zodNumericEnum,
  zodNumericObjectKey,
} from 'client/modules/localstorage/utils/zodValidators';
import { PrivacySettings } from 'client/modules/privacy/types';
import { SavedSubaccountSigningPreference } from 'client/modules/singleSignatureSessions/types';
import { DEFAULT_SUBACCOUNT_AVATAR } from 'client/modules/subaccounts/consts';
import { SubaccountProfile } from 'client/modules/subaccounts/types';
import {
  BALANCES_FILTER_OPTION_IDS,
  HISTORICAL_TRADES_FILTER_OPTION_IDS,
  OPEN_ORDERS_FILTER_OPTION_IDS,
  POSITIONS_FILTER_OPTION_IDS,
  REALIZED_PNL_EVENTS_FILTER_OPTION_IDS,
} from 'client/modules/trading/components/TradingTableTabs/types';
import { ORDERBOOK_PRICE_TICK_SPACING_MULTIPLIERS } from 'client/modules/trading/marketOrders/orderbook/types';
import { TRIGGER_CRITERIA_PRICE_TYPES } from 'client/modules/trading/tpsl/tpslDialog/types';
import { PORTFOLIO_HISTORY_TAB_IDS } from 'client/pages/Portfolio/subpages/History/consts';
import { z } from 'zod';

const profileSchema = z
  .custom<SubaccountProfile>((data) => typeof data?.username === 'string')
  .transform((data) =>
    isValidProfileAvatar(data.avatar)
      ? data
      : {
          ...data,
          avatar: DEFAULT_SUBACCOUNT_AVATAR,
        },
  );

const subaccountSigningPreferenceSchema =
  z.custom<SavedSubaccountSigningPreference>((data) => {
    if (!data || !('type' in data)) {
      return false;
    }

    switch (data.type) {
      case 'sign_once':
        return (
          typeof data.rememberMe === 'boolean' &&
          // privateKey can either be undefined or string
          ['undefined', 'string'].includes(typeof data.privateKey)
        );
      case 'sign_always':
        return true;
      default:
        return false;
    }
  });

const slippageSchema = z.object({
  market: z.number(),
  stopMarket: z.number(),
  takeProfit: z.number(),
  stopLoss: z.number(),
}) satisfies z.ZodType<OrderSlippageSettings>;

const marginModeSchema = z.object({
  default: z.enum(MARGIN_MODES_TYPES),
  lastSelected: z.record(
    zodNumericObjectKey(),
    z.union([
      z.object({
        mode: z.literal('isolated'),
        leverage: z.number(),
        enableBorrows: z.boolean(),
      }),
      z.object({
        mode: z.literal('cross'),
        leverage: z.number(),
      }),
    ]),
  ),
}) satisfies z.ZodType<MarginModeSettings>;

export const settingsSchema = z.object({
  favoriteMarketIds: z.array(z.number()),
  navPins: z.array(z.enum(NAV_ACCOUNT_PIN_STORAGE_IDS)),
  portfolio: z.object({
    enabledOptionalHistoryTabIds: z.array(z.enum(PORTFOLIO_HISTORY_TAB_IDS)),
  }) satisfies z.ZodType<SavedPortfolioUserSettings>,
  privacy: z.object({
    areAccountValuesPrivate: z.boolean(),
    isAddressPrivate: z.boolean(),
  }) satisfies z.ZodType<PrivacySettings>,
  profileBySubaccountKey: z.record(z.string(), profileSchema),
  selectedSubaccountNameByChainEnv: z.record(
    z.enum(ALL_CHAIN_ENVS),
    z.string(),
  ),
  signingPreferenceBySubaccountKey: z.record(
    z.string(),
    subaccountSigningPreferenceSchema,
  ),
  trading: z.object({
    consolePosition: z.enum(TRADING_CONSOLE_POSITIONS),
    leverageByProductId: z.record(zodNumericObjectKey(), z.number()),
    marginMode: marginModeSchema,
    orderbookTickSpacingMultiplierByProductId: z.record(
      zodNumericObjectKey(),
      zodNumericEnum(ORDERBOOK_PRICE_TICK_SPACING_MULTIPLIERS),
    ),
    showOrderbookTotalInQuote: z.boolean(),
    spotLeverageEnabled: z.boolean(),
    slippage: slippageSchema,
    enableTradingNotifications: z.boolean(),
    enableTradingOrderLines: z.boolean(),
    tpSlTriggerPriceType: z.enum(TRIGGER_CRITERIA_PRICE_TYPES),
    selectedFilterByTradingTableTab: z.object({
      positions: z.enum(POSITIONS_FILTER_OPTION_IDS),
      balances: z.enum(BALANCES_FILTER_OPTION_IDS),
      openEngineOrders: z.enum(OPEN_ORDERS_FILTER_OPTION_IDS),
      openTriggerOrders: z.enum(OPEN_ORDERS_FILTER_OPTION_IDS),
      historicalTrades: z.enum(HISTORICAL_TRADES_FILTER_OPTION_IDS),
      realizedPnlEvents: z.enum(REALIZED_PNL_EVENTS_FILTER_OPTION_IDS),
    }),
  }) satisfies z.ZodType<SavedTradingUserSettings>,
}) satisfies z.ZodType<SavedUserSettings>;
