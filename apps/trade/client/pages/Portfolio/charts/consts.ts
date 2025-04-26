import { TimeInSeconds } from '@vertex-protocol/client';
import { getTradeAppColorVar } from 'client/modules/theme/colorVars';
import { mapValues } from 'lodash';

export const PORTFOLIO_CHART_GRADIENT_IDS = {
  accountValue: 'account_value',
  pnlPositive: 'pnl_positive',
  pnlNegative: 'pnl_negative',
  funding: 'funding',
  netBalance: 'net_balance',
  apr: 'apr',
  deposits: 'deposits',
  borrows: 'borrows',
  interest: 'interest',
} as const;

export const PORTFOLIO_CHART_GRADIENT_URLS = mapValues(
  PORTFOLIO_CHART_GRADIENT_IDS,
  (id) => `url(#${id})`,
);

export const PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS = {
  interest: [
    {
      id: PORTFOLIO_CHART_GRADIENT_IDS.interest,
      stopColor: getTradeAppColorVar('positive'),
    },
  ],
  funding: [
    {
      id: PORTFOLIO_CHART_GRADIENT_IDS.funding,
      stopColor: getTradeAppColorVar('warning'),
    },
  ],
  pnl: [
    {
      id: PORTFOLIO_CHART_GRADIENT_IDS.pnlPositive,
      stopColor: getTradeAppColorVar('positive'),
    },
    {
      id: PORTFOLIO_CHART_GRADIENT_IDS.pnlNegative,
      stopColor: getTradeAppColorVar('negative'),
    },
  ],
};

export const PORTFOLIO_CHART_TIMESPAN_METADATA = {
  '24h': {
    shortLabel: '24h',
    longLabel: '24h',
    durationInSeconds: TimeInSeconds.DAY,
  },
  '7d': {
    shortLabel: '7d',
    longLabel: '7d',
    durationInSeconds: 7 * TimeInSeconds.DAY,
  },
  '30d': {
    shortLabel: '30d',
    longLabel: '30d',
    durationInSeconds: 30 * TimeInSeconds.DAY,
  },
  all_time: {
    shortLabel: 'All',
    longLabel: 'All Time',
    durationInSeconds: Infinity,
  },
} as const;
