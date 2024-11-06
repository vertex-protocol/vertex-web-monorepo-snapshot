import { LBA_AIRDROP_EPOCH } from '@vertex-protocol/client';
import { VOVRTX_INFO, VRTX_TOKEN_INFO } from '@vertex-protocol/metadata';
import { DiscList, LinkButton } from '@vertex-protocol/web-ui';
import { FUUL_REFERRALS_REWARDS_CONFIG } from 'client/modules/referrals/consts';
import { DefinitionTooltipConfig } from 'client/modules/tooltips/DefinitionTooltip/types';
import { ReferralTierDetailsTooltipContent } from 'client/pages/VertexReferrals/components/ReferralTierDetailsTooltipContent';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

const portfolioOverviewTooltips = {
  overviewPerpPnL: ({ primaryQuoteToken }) => ({
    title: `Perp Positions PnL`,
    content: `The sum of your Estimated PnL across all open perp positions. Perp PnL (${primaryQuoteToken.symbol}) is settled periodically into balances. This represents both settled and unsettled amounts.`,
  }),
  overviewAccountPnL: {
    title: `Account PnL`,
    content: `Your account-wide PnL, including perp trades and spot positions. You can change the time frame in the top right of the chart.`,
  },
  overviewAccountValue: ({ primaryQuoteToken }) => ({
    title: `Account Value`,
    content: `The total $ value of an account, using the oracle price. Account value = assets + pools - borrows +/- unsettled ${primaryQuoteToken.symbol}.`,
  }),
  overviewFundsUntilLiquidation: {
    title: (
      <>
        <p>Funds until Liquidation</p>
        <p>(Maintenance Margin)</p>
      </>
    ),
    content: `The amount of funds an account has until it is eligible for liquidation. If this value falls to zero, your positions will be liquidated until a positive balance is restored. This metric is calculated using the sum of maintenance margin values for assets, borrows, pools and perpetual positions.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const portfolioBalancesTooltips = {
  balancesInterestChartAccuracy: {
    title: `Interest Chart`,
    content: `Due to how we track historical data, the interest chart is accurate only when there are user transactions during the selected period.`,
  },
  balancesNetAPR: {
    title: `Net APR`,
    content: `The estimated average APR across your deposits and borrows.`,
  },
  balancesNetBalance: ({ primaryQuoteToken }) => ({
    title: `Net Balance`,
    content: `The sum of your balances. This does not include unsettled Perp PnL (${primaryQuoteToken.symbol}).`,
  }),
  balancesTotalBorrowAPR: {
    title: `Total Borrow APR`,
    content: `The estimated borrow APR across all your negative balances.`,
  },
  balancesTotalBorrows: {
    title: `Total Borrows`,
    content: `The total value of all borrows you have made from your account.`,
  },
  balancesTotalDepositAPR: {
    title: `Total Deposit APR`,
    content: `The estimated deposit APR across all your positive balances.`,
  },
  balancesTotalDeposits: {
    title: `Total Deposits`,
    content: `The total value of all deposits you have made to your account.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const portfolioPerpsTooltips = {
  perpFundingChartAccuracy: {
    title: `Funding Chart`,
    content: `Due to how we track historical data, the funding chart is accurate only when there are user transactions during the selected period.`,
  },
  perpOpenPositionsMarginUsed: {
    title: `Margin Used`,
    content: `The margin required to maintain the open positions.`,
  },
  perpOpenPositionsNotional: {
    title: `Open Positions - Total Notional`,
    content: `The total notional size of perpetual contracts you have open.`,
  },
  perpOpenPositionsPnl: {
    title: `Open Positions PnL`,
    content: `The sum of your open perp positions PnL based on the oracle price.`,
  },
  perpPnLOverTime: {
    title: `Perp PnL Over Time`,
    content: `This displays your total perp pnl for the time selected. You can select a time-frame on the top right of the chart.`,
  },
  perpTotalPerpPnl: {
    title: `Total Perp PnL`,
    content: `Your total profit or loss from trading perps. This includes all PnL from previously closed perp positions and your current open positions based on the oracle price.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const portfolioPoolsTooltips = {
  poolsAverageAPR: {
    title: `Avg. APR`,
    content: `The average APR across all your LP positions based on the combination of trading fees and deposit interest.`,
  },
  poolsTotalUnrealizedPnL: {
    title: `Total Unrealized PnL`,
    content: `This is the total sum of your LP PnL across all current positions. This includes trading fees and deposit interest earned.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const portfolioMarginManagerTooltips = {
  marginManagerSpotQuoteBalance: ({ primaryQuoteToken }) => ({
    title: `${primaryQuoteToken.symbol} Cash Balance`,
    content: `This is the amount of ${primaryQuoteToken.symbol} you have deposited or are borrowing. The balance is negative if you are borrowing.`,
  }),
  marginManagerQuoteNetBalance: ({ primaryQuoteToken }) => ({
    title: `Net ${primaryQuoteToken.symbol} Balance`,
    content: `This is the sum of your cash balance and unsettled balance.`,
  }),
  marginManagerUnsettledQuoteBalance: ({ primaryQuoteToken }) => ({
    title: `Unsettled ${primaryQuoteToken.symbol} Balance`,
    content: `If you have open perp positions, this is the portion of your PnL that hasn't been settled. Settlements are made automatically between losing and winning positions.`,
  }),
  marginManagerSpotAssetBalance: {
    title: `Asset Balance`,
    content: `The balance of the asset. A positive balance indicates a deposit and a negative balance indicates a borrow.`,
  },
  marginManagerSpotBalanceValue: {
    title: `Balance Value`,
    content: `This is the market value of the balance using the oracle price.`,
  },
  marginManagerSizeOfSpread: {
    title: `Spread Size`,
    content: (
      <>
        <div>
          This is the amount of exposure/risk offset between spot and perp.
        </div>
        <div>
          For example: if you have 10 ETH spot and -5 ETH perp, the Spread Size
          is the 5 ETH offset between the two.
        </div>
      </>
    ),
  },
  marginManagerSpotPortionOfSpread: {
    title: `Spot Portion of Spread`,
    content: (
      <>
        <div>
          This is the portion of the spread that comes from a spot position
          (deposit or borrow).
        </div>
        <div>
          If you are holding 10 ETH but only 5 of it contributes to the spread,
          then only 5 will be displayed here, since that is what you are awarded
          a discount on.
        </div>
      </>
    ),
  },
  marginManagerPerpPortionOfSpread: {
    title: `Perp Portion of Spread`,
    content: (
      <>
        <div>
          This is the portion of the spread that comes from a perp position.
        </div>
        <div>
          If you are short -10 ETH-PERP but only 5 of it contributes to the
          spread, then only -5 ETH-PERP will be displayed here, since that is
          what you are awarded a discount on.
        </div>
      </>
    ),
  },
  marginManagerQuoteMarginCalc: ({ primaryQuoteToken }) => ({
    title: `${primaryQuoteToken.symbol} Collateral/Margin`,
    content: `${primaryQuoteToken.symbol} collateral and borrow value is weighted 1:1 with market value (oracle).`,
  }),
  marginManagerBalancesMarginCalc: {
    title: `Balances Margin Impact`,
    content: (
      <div className="flex flex-col gap-y-2">
        To determine the collateral value or margin required for a balance:
        <DiscList.Container>
          <DiscList.Item>
            Positive balance (deposit): long weight &times; value of net balance
          </DiscList.Item>
          <DiscList.Item>
            Negative balance (borrow): short weight &times; value of net balance
          </DiscList.Item>
        </DiscList.Container>
        <div>Value is determined using oracle price.</div>
      </div>
    ),
  },
  marginManagerPerpMarginCalc: {
    title: `Perp Margin`,
    content: (
      <div className="flex flex-col gap-y-2">
        <DiscList.Container>
          <DiscList.Item>
            Long: -(1 - long weight) &times; amount &times; price
          </DiscList.Item>
          <DiscList.Item>
            Short: -(1 - short weight) &times; amount &times; price
          </DiscList.Item>
        </DiscList.Container>
        <div>The oracle is used for price.</div>
      </div>
    ),
  },
  marginManagerLpPositionsMarginCalc: {
    title: `LP Positions Collateral`,
    content: (
      <div className="flex flex-col gap-y-2">
        <div>
          LP positions are treated like balances, except the weight of the
          non-USDC asset is used for the entire position.
        </div>
        <DiscList.Container>
          <DiscList.Item>
            Collateral value: Long weight of non-USDC asset &times; liquidity
            provided
          </DiscList.Item>
        </DiscList.Container>
      </div>
    ),
  },
  marginManagerSpreadMarginCalc: {
    title: `Spread Benefit`,
    content: (
      <div className="flex flex-col gap-y-2">
        <div>
          The protocol gives a margin benefit for accounts with spot and perp
          positions that offset one another. Balances in LPs aren&apos;t counted
          for spreads.
        </div>
        <div>
          To learn how this is calculated, refer to{' '}
          <LinkButton
            href={LINKS.spreadDocs}
            external
            as={Link}
            colorVariant="primary"
          >
            Spread Docs.
          </LinkButton>
        </div>
      </div>
    ),
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const referralsTooltips = {
  referralsFeeRebates: {
    title: `Fee Rebates`,
    content: `Referred traders receive a ${FUUL_REFERRALS_REWARDS_CONFIG.rebatePercentage}% rebate on their taker trade fees.`,
  },
  referralsTotalReferredTakerVolume: {
    title: `Total Taker Volume`,
    content: `Total trading volume generated by your referred users.`,
  },
  referralsPastProgramRewards: {
    title: `Past Program Rewards`,
    content: `Rewards earned from the past referrals program. Please refer to Vertex docs for more details.`,
  },
  referralsTierDetails: {
    title: `Tier Details`,
    content: <ReferralTierDetailsTooltipContent />,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const rewardsTooltips = {
  rewardsEstimatedNewRewards: {
    title: `Estimated New Rewards`,
    content: (
      <p>
        The estimated amount of rewards you would receive for the current epoch
        on the{' '}
        <span className="text-text-primary font-medium">
          currently selected chain
        </span>
        . This is based on your share of the rewards pool and your trading
        activity vs. others. Pending rewards will be realized at the end of the
        epoch.
      </p>
    ),
  },
  rewardsAvailableToClaim: {
    title: `Available to Claim`,
    content: `Your claimable rewards for the last completed epoch. You can claim rewards for prior epochs by expanding the summary. You have 30 days to claim rewards for an epoch after the epoch finishes.`,
  },
  rewardsShareOfRewardsPool: {
    title: `Share of Rewards Pool`,
    content: (
      <p>
        This is your share of the rewards pool on the{' '}
        <span className="text-text-primary font-medium">
          currently selected chain
        </span>
        . Your share is based on your trading activity vs. total trading
        activity during the epoch.
      </p>
    ),
  },
  rewardsTotalRewardsEarned: {
    title: `Total Rewards Earned`,
    content: `The total ${VRTX_TOKEN_INFO.symbol} rewards you have earned from completed epochs. Realized rewards earned on other Vertex chains may take a few days to reflect here.`,
  },
  rewardsTradingFeesPaid: {
    title: `Trading Fees`,
    content: `Calculated as Trading Volume × Fee Rate, this is the portion of trading fees used to determine your share of rewards. This excludes sequencer and minimum order fees.`,
  },
  rewardsLbaPositionAvailableToClaim: {
    title: `Available to Claim`,
    content: `Your unclaimed LBA rewards. LBA position rewards are distributed weekly. Claimed ${VRTX_TOKEN_INFO.symbol} goes to your wallet.`,
  },
  rewardsLbaPositionValue: {
    title: `Liquidity Provided`,
    content: `The value of your provided LBA liquidity, which can be withdrawn once it unlocks. Open the summary for details.`,
  },
  rewardsLbaTotalRewardsEarned: {
    title: `Total Rewards`,
    content: `The total ${VRTX_TOKEN_INFO.symbol} earned by your LBA position. Open the summary for details.`,
  },
  rewardsFoundationTotalEarned: {
    title: `Total Earned`,
    content: `The total amount of tokens you have earned excluding your estimated rewards for the current week. Incentives are earned based on the trading fees that you have accrued.`,
  },
  rewardsFoundationEstNew: {
    title: `Est. New`,
    content: `The estimated new incentives you could earn for the current week. Incentives are based on the trading fees that you have accrued and are realized at the end of each week.`,
  },
  rewardsFoundationAvailableToClaim: {
    title: `Available to Claim`,
    content: `Incentives are distributed per week. There may be a delay of up to a few days between the end of each week and when the rewards are distributed. Each transaction will automatically claim all unclaimed rewards from previous weeks.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const pointsTooltips = {
  pointsTradingPoints: {
    title: `Trading Points`,
    content: `You earn points for using the app. Points are distributed proportionally based on activity.`,
  },
  pointsReferralPoints: {
    title: `Referral Earned`,
    content: `You earn 25% of the points that your referrals earn.`,
  },
  pointsInitialPoints: {
    title: `Initial Points`,
    content: `The initial points airdrop was distributed to wallets based on their on-chain activity.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const stakingTooltips = {
  stakingLbaPosition: {
    title: `LBA Position`,
    content: `The LBA took place after Epoch ${LBA_AIRDROP_EPOCH}. If you participated in the LBA, your position will appear below.`,
  },
  stakingCurrentApr: {
    title: `Est. APR`,
    content: (
      <>
        <p>The current estimated staking APR based on:</p>
        <DiscList.Container>
          <DiscList.Item>
            Your share of the {VOVRTX_INFO.symbol} staking pool
          </DiscList.Item>
          <DiscList.Item>
            The last distribution of protocol revenue to stakers
          </DiscList.Item>
        </DiscList.Container>
      </>
    ),
  },
  stakingAccountScore: {
    title: `${VOVRTX_INFO.symbol} Score`,
    content: (
      <>
        <p>
          Your {VOVRTX_INFO.symbol} score determines your share of the staking
          pool.
        </p>
        <div>
          <p>{VOVRTX_INFO.symbol} Score</p>
          <p>= {VRTX_TOKEN_INFO.symbol} staked &times; Multiplier</p>
          <p>
            = {VRTX_TOKEN_INFO.symbol} staked &times; (1 + 1.5 &times; min(Time
            Deposited / 183 Days))
          </p>
        </div>
      </>
    ),
  },
  stakingRewards: ({ primaryQuoteToken }) => ({
    title: `Staking Rewards`,
    content: (
      <>
        <p>
          A portion of protocol revenue ({primaryQuoteToken.symbol}) is
          distributed to {VOVRTX_INFO.symbol} stakers weekly.
        </p>
        <p>
          You have two options: claim {primaryQuoteToken.symbol} to wallet or
          compound rewards into staked {VRTX_TOKEN_INFO.symbol}.
        </p>
      </>
    ),
  }),
  stakingEstMaxApr: {
    title: `Est. Max APR`,
    content: `Your estimated APR when you reach your max ${VOVRTX_INFO.symbol} score. APRs are variable and subject to change`,
  },
  stakingFeeDistribution: {
    title: `7d Protocol Fees Distribution`,
    content: `The last distribution of protocol fees that was sent to stakers in the ${VOVRTX_INFO.symbol} pool.`,
  },
  stakingLastStakeDate: {
    title: `Last Stake Date`,
    content: `The date you last staked ${VRTX_TOKEN_INFO.symbol}. You will reach the max score 183 days after the last stake date unless your ${VOVRTX_INFO.symbol} score was reset by unstaking.`,
  },
  stakingLastUnstakeDate: {
    title: `Last Unstake Date`,
    content: `The date you last unstaked. Unstaking any amount of ${VRTX_TOKEN_INFO.symbol} resets your multiplier to 1x and ${VOVRTX_INFO.symbol} score to baseline.`,
  },
  stakingMaxScoreDate: {
    title: `Max Score Date`,
    content: `The date your current position will reach its max ${VOVRTX_INFO.symbol} score. This resets if you stake or unstake any amount.`,
  },
  stakingMultiplier: {
    title: `Avg. voVRTX Multiplier`,
    content: (
      <>
        <p>
          Avg. voVRTX Multiplier is the average amount of {VOVRTX_INFO.symbol}{' '}
          you have accrued compared to the amount of staked{' '}
          {VRTX_TOKEN_INFO.symbol}. The boost increases linearly over 6 months
          from 1x &rarr; 2.5x.
        </p>
        <p>
          When you stake more {VRTX_TOKEN_INFO.symbol}, the newly staked{' '}
          {VRTX_TOKEN_INFO.symbol} starts at a multiplier of 1x. This will
          increase your total {VOVRTX_INFO.symbol} score and thus your share of
          rewards. However, this will decrease your average {VOVRTX_INFO.symbol}{' '}
          multiplier.
        </p>
      </>
    ),
  },
  stakingPoolSize: {
    title: `${VOVRTX_INFO.symbol} Pool Size`,
    content: `The total ${VOVRTX_INFO.symbol} score of all stakers in the pool.`,
  },
  stakingPoolAvgStakingRewards: {
    title: `Avg. Staking Rewards`,
    content: `The estimated average staking rewards for the pool expressed as an annualized percentage.`,
  },
  stakingUnstakePending: {
    title: `Unstaked Pending`,
    content: `Unstaked ${VRTX_TOKEN_INFO.symbol} takes 14 days to unlock and be available for withdrawal.`,
  },
  stakingVrtxInWallet: {
    title: `${VRTX_TOKEN_INFO.symbol} in Wallet`,
    content: `Staking is done from your wallet. If you have ${VRTX_TOKEN_INFO.symbol} in your Vertex account, you'll need to withdraw before staking.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const lpTooltips = {
  lpEstimatedConversionPrice: {
    title: `Estimated Price`,
    content: `This is the estimated conversion price. The actual price can vary depending on the state of the pool at the time of withdrawal.`,
  },
  lpPoolAPR: {
    title: `Pool APR`,
    content: `The estimated APR for this pool is a combination of the trading fees and deposit interest earned.`,
  },
  lpPositionComposition: {
    title: `LP Position Composition`,
    content: `The underlying balances that make up your LP Position.`,
  },
  lpPositionPnL: {
    title: `LP Position PnL`,
    content: `This is your LP Position's profit or loss based on the current value of the position minus the entry value. This includes the fees and deposit interest earned while holding the LP position.`,
  },
  lpTotalProvided: {
    title: `Total Provided`,
    content: `The total amount of liquidity provided by all of your LP positions.`,
  },
  lpTVL: {
    title: `TVL`,
    content: `The total amount of liquidity provided to the pool. This does not include orderbook liquidity.`,
  },
  lpUnderlyingBalance: {
    title: `Balance`,
    content: `Your underlying spot balance for the asset. The max you can contribute may be less than this amount due to slippage and margin requirements.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const spotTradingTooltips = {
  spotLeverageSwitch: {
    title: `Margin spot`,
    content: `Margin spot enables you to auto-borrow assets against your margin to trade with a larger size. Turn Margin ON to enable borrowing. Turn OFF to disable borrowing.`,
  },
  spotTradingAvailableQuote: {
    title: `Available`,
    content: `Your available balance for the order. For market orders, this may be less than your asset balance due to slippage.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const perpTradingTooltips = {
  perpFundingRate1h: {
    title: `Funding / Countdown`,
    content: (
      <>
        <p>
          Funding payments are made every hour and calculated algorithmically
          based on the spot index price &amp; the TWAP of the orderbook price.
          The 1h and annualized rates display the current estimated funding
          rate.
        </p>
        <p>The countdown displays the time until the next funding payment.</p>
      </>
    ),
  },
  perpOpenInterest: ({ primaryQuoteToken }) => ({
    title: `Open Interest`,
    content: `The total outstanding in perpetual contracts for that market, denominated in the quote ${primaryQuoteToken.symbol}.`,
  }),
  perpUnderlyingSpotIndexPrice: {
    title: `Spot Index Price`,
    content: `The price of the underlying spot asset across other exchanges. It's used to calculate funding rates.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const tradingTooltips = {
  tradingOrderbookOpenOrder: {
    title: 'Your order',
    content: 'You have an order at this price.',
  },
  tradingPostOnly: {
    title: `Post Only`,
    content: `The order will only be placed if it can be added as a maker order and not as a taker order.`,
  },
  tradingReduceOnly: {
    title: `Reduce Only`,
    content: `The order will only reduce position, any remaining unfilled portion resulting in position increase will get cancelled.`,
  },
  tradingTimeInForce: {
    title: `Time in force`,
    content: (
      <>
        <DiscList.Container>
          <DiscList.Item>
            Good Until: The order will remain open until it is filled,
            cancelled, or expires based on the time set below.
          </DiscList.Item>
          <DiscList.Item>
            IOC: The order will be immediately executed and any unfilled portion
            will be cancelled.
          </DiscList.Item>
          <DiscList.Item>
            FOK: The order will be cancelled if not entirely filled. No partial
            fills are allowed.
          </DiscList.Item>
        </DiscList.Container>
      </>
    ),
  },
  tradingEstimatedFee: ({ primaryQuoteToken }) => ({
    title: `Est. Fee`,
    content: (
      <>
        <p>
          Trading fees are paid in {primaryQuoteToken.symbol} and apply to taker
          orders: trades that immediately cross the book.
        </p>
        <p>
          The minimum taker fee is: maker order price &times; min limit order
          size &times; taker fee rate
        </p>
        <p>
          There are ZERO fees on maker limit orders: trades that add liquidity
          to the book.
        </p>
      </>
    ),
  }),
} as const satisfies Record<string, DefinitionTooltipConfig>;

const skateVaultsTooltips = {
  skateVaultsStrategy: {
    title: `Vault Strategy & APY`,
    content: `APY comes from a delta neutral trading strategy and external rewards. Rewards are auto-compounded back into your position`,
  },
  skateOllies: {
    title: `SkatePark Ollies`,
    content: `Ollies serve as the points system for Skate and reward early and active contributors to Skate.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const subaccountTooltips = {
  sumOfSubaccounts: {
    title: 'Sum of Accounts',
    content:
      'Sum of all accounts shown. This does not include accounts created via our API.',
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const tradingCompetitionTooltips = {
  tradingCompetitionEligibilityInfo: {
    title: 'Eligibility Info',
    content: (
      <>
        <p>
          Eligibility is recalculated every few hours. To be eligible, you must:
        </p>
        <DiscList.Container>
          <DiscList.Item>
            Exceed the minimum required account size or asset balance
          </DiscList.Item>
          <DiscList.Item>
            Accrue the required trading volume by trading in any market
          </DiscList.Item>
          <DiscList.Item>
            Perform an action (deposit, withdraw, or trade) after the
            competition begins
          </DiscList.Item>
        </DiscList.Container>
      </>
    ),
  },
  tradingCompetitionMinAccountSize: {
    title: 'Minimum Account Size',
    content:
      'Account value required to be eligible for this tier. Your account value must be maintained for the entire competition.',
  },
  tradingCompetitionMinAssetBalance: {
    title: 'Minimum Balance',
    content:
      'The balance required to be eligible for this tier. It must be maintained for the entire competition.',
  },
  tradingCompetitionMinVolume: {
    title: 'Minimum Volume',
    content:
      'You must generate the required amount of trading volume during the duration of the competition. Volume is tracked for both maker and taker trades. Only accounts that meet the volume threshold at the end of the competition will be eligible for prizes.',
  },
  tradingCompetitionTableVolume: {
    title: 'Competition Volume',
    content:
      'The amount of volume you have generated during the duration of the competition. Volume is tracked for both maker and taker trades. Only accounts that meet the volume threshold at the end of the competition will be eligible for prizes.',
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

export const pageTooltips = {
  ...portfolioOverviewTooltips,
  ...portfolioPerpsTooltips,
  ...portfolioBalancesTooltips,
  ...portfolioPoolsTooltips,
  ...portfolioMarginManagerTooltips,
  ...rewardsTooltips,
  ...pointsTooltips,
  ...referralsTooltips,
  ...lpTooltips,
  ...stakingTooltips,
  ...spotTradingTooltips,
  ...perpTradingTooltips,
  ...tradingTooltips,
  ...skateVaultsTooltips,
  ...subaccountTooltips,
  ...tradingCompetitionTooltips,
} as const satisfies Record<string, DefinitionTooltipConfig>;
