import { DiscList } from '@vertex-protocol/web-ui';
import { DefinitionTooltipConfig } from 'client/modules/tooltips/DefinitionTooltip/types';

/**
 * Tooltips used across the app that aren't specific to a page, dialog, or table
 */
export const commonTooltips = {
  assetBalance: ({ primaryQuoteToken }) => ({
    title: `Asset Balance`,
    content: `Your net balance for this asset. Positive indicates a deposit and negative indicates a borrow. Unsettled ${primaryQuoteToken.symbol} is not included.`,
  }),
  borrowAPR: {
    title: `Borrow APR`,
    content: `The current estimated APR for borrowing the asset. Interest is paid automatically on all borrows. Payments are made on average every 15 minutes.`,
  },
  depositAPR: {
    title: `Deposit APR`,
    content: `The current estimated APR for depositing/holding this asset. Interest is earned automatically on all deposits. Payments are made on average every 15 minutes.`,
  },
  realizedPnl: {
    title: `PnL`,
    content: (
      <>
        <p>
          The realized gain or loss resulting from the order fill. Fees for this
          fill event are included, but fees from any preceding fills are not.
          Funding is not included.
        </p>
        <p>
          If your reduce position order filled across multiple trades, then your
          realized PnL for the entire position is the sum of trades for that
          position.
        </p>
      </>
    ),
  },
  triggerPrice: {
    title: `Trigger Price`,
    content: `The price at which a market order will be executed.`,
  },
  lastPrice: {
    title: `Last Price`,
    content: `The last trade price of the market.`,
  },
  averageEntryPrice: {
    title: `Entry Price`,
    content: `The weighted average price at which you entered the position.`,
  },
  estimatedPositionPnL: {
    title: `Est. PnL`,
    content: `A position's total Profit or Loss estimation based on average entry and the estimated exit price. This does not include funding, fees, and slippage.`,
  },
  oraclePrice: {
    title: `Oracle Price`,
    content: `The price of the perpetual contract across other exchanges.`,
  },
  accountLeverage: {
    title: `Account Leverage`,
    content: `The multiplier of how much margin you're using against the value of your assets.`,
  },
  marginUsage: {
    title: `Margin Usage (Initial)`,
    content: (
      <>
        <p>
          Margin Usage represents the percentage of your account margin that is
          being actively consumed by your cross perpetual positions and borrows.
        </p>
        <DiscList.Container>
          <DiscList.Item>
            Margin Usage = (Account Value - Initial Margin) / Account Value.
          </DiscList.Item>
          <DiscList.Item>
            At a margin usage of 100%, you will not be able to initiate new
            positions.
          </DiscList.Item>
        </DiscList.Container>
        <p>
          Please note - 100% does not mean liquidation. It means that you will
          need to add collateral or reduce risk to continue trading.
        </p>
      </>
    ),
  },
  fundsAvailableUsd: {
    title: (
      <>
        <p>Funds Available</p>
        <p>(Initial Margin / Free Collateral)</p>
      </>
    ),
    content: `The funds you have available to trade with. This is calculated using the sum of initial margin values for assets, borrows, pools, and cross-margin perpetual positions.`,
  },
  fundsUntilLiquidationUsd: {
    title: (
      <>
        <p>Funds until Liquidation</p>
        <p>(Maintenance Margin)</p>
      </>
    ),
    content: `The amount of funds an account has until it is eligible for liquidation. If this value falls to zero, your positions will be liquidated until a positive balance is restored. This metric is calculated using the sum of maintenance margin values for assets, borrows, pools and cross-margin perpetual positions.`,
  },
  gasFee: {
    title: `Gas Fee`,
    content: `The fee is used by our sequencer to submit transactions on-chain.`,
  },
  maxWithBorrow: {
    title: `Max with borrow`,
    content: `The combination of your available balance and what you can borrow against your margin. Borrowing is done automatically.`,
  },
  maxAmount: {
    title: `Max amount`,
    content: `Your balance of the asset minus what's being held in open orders or required as margin.`,
  },
  enableBorrowsSwitch: {
    title: `Borrows (on/off)`,
    content: `Enables you to borrow assets against your existing collateral. Borrowing increases your margin usage and account risk.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;
