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
