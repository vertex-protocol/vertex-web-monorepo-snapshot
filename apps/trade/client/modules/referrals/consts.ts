import { clientEnv } from 'common/environment/clientEnv';

/**
 * Query parameter in the URL used to track referrals.
 * For separation, Blitz (our backend referral system) uses `referral` and Vertex (Fuul) uses `ref`
 */
export const REFERRAL_QUERY_PARAM = {
  // Fuul requires that the query param be `referrer`
  vertex: 'referrer',
  blitz: 'referral',
}[clientEnv.base.brandName];

/**
 * Centralized place for rewards configuration, this is extracted so we don't need to track down mentions of the specific values in the UI
 */
export const FUUL_REFERRALS_REWARDS_CONFIG = {
  // If the user is referred by someone else, the user will get a % rebate of the trading fees
  rebatePercentage: 10,
  tierCommissionPercentages: {
    tierOne: 10,
    tierTwo: 20,
    tierThree: 25,
    tierFour: 30,
    tierFive: 40,
  },
};
