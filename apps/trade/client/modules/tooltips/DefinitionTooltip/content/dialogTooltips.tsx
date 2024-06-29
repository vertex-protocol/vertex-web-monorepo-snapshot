import { DiscList } from '@vertex-protocol/web-ui';
import { DefinitionTooltipConfig } from 'client/modules/tooltips/DefinitionTooltip/types';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';

const settingsTooltips = {
  settingsOrderNotifications: {
    title: 'Order Notifications',
    content: `Enable notifications for order placements, fills, and cancels.`,
  },
  settingsChartOrderLines: {
    title: 'Chart Order Lines',
    content: `Enable order lines on the price chart.`,
  },
  settingsSlippageTolerance: {
    title: 'Slippage Tolerance',
    content: `Customize slippage tolerance per order type or reset to default by clicking the refresh icon.`,
  },
  settingsLowSlippageWarning: {
    title: 'Low Slippage',
    content: `Orders may fail to execute.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const singleSignatureTooltips = {
  octRememberMe: {
    title: 'Remember Me',
    content: `When enabled, you will not be required to re-approve One-Click Trading unless you clear your browser cache or manually disconnect your wallet.`,
  },
  octRemainingActivations: {
    title: `Remaining Activations`,
    content:
      'You are allowed to enable 1CT 5 times max per week. You can switch back to Sign Every Transaction after that, but cannot enable 1CT until the following week.',
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const takeProfitStopLossTooltips = {
  perpTp: {
    title: `Take Profit`,
    content: (
      <>
        <p>
          Take Profit (TP) orders let you set a price that will trigger a{' '}
          <span className="text-text-primary">stop market order</span> to close
          a position and realize profit. Stop market orders are fill-or-kill,
          which means the order will not execute if it cannot be filled within
          slippage limits. Please monitor and recreate your orders if needed.
        </p>
        <p>
          TP orders use the same slippage as market orders, which is
          configurable in the order placement console.
        </p>
        <DiscList.Container>
          <DiscList.Item>
            Last price - the TP will trigger based on the last traded price.
          </DiscList.Item>
          <DiscList.Item>
            Oracle price - the TP will trigger based on the oracle price.
          </DiscList.Item>
        </DiscList.Container>
      </>
    ),
  },
  perpSl: {
    title: `Stop Loss`,
    content: (
      <>
        <p>
          Stop Loss (SL) orders let you set a price that will trigger a{' '}
          <span className="text-text-primary">stop market order</span> to close
          a position and reduce further loss. Stop market orders are
          fill-or-kill, which means the order will not execute if it cannot be
          filled within slippage limits. Please monitor and recreate your orders
          if needed.
        </p>
        <p>
          TP orders use the same slippage as market orders, which is
          configurable in the order placement console.
        </p>
        <DiscList.Container>
          <DiscList.Item>
            Last price - the SL will trigger based on the last traded price on.
          </DiscList.Item>
          <DiscList.Item>
            Oracle price - the SL will trigger based on the oracle price.
          </DiscList.Item>
        </DiscList.Container>
      </>
    ),
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const depositTooltips = {
  smartContractWalletSigningPrompt: {
    title: `Using a smart contract wallet?`,
    content: (
      <p>
        If you are using Safe or another smart contract wallet, please enable
        1CT after depositing. This is so we can request signatures for
        transactions.
      </p>
    ),
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const withdrawTooltips = {
  withdrawEnableBorrowsSwitch: {
    title: `Borrows (on/off)`,
    content: `Enables you to borrow assets against your existing collateral. Borrowing increases your margin usage and account risk.`,
  },
  withdrawMaxWithBorrow: {
    title: `Max with borrow`,
    content: `The combination of your available balance and what you can borrow against your margin. Borrowing is done automatically once you place the withdrawal.`,
  },
  withdrawMaxWithdrawal: {
    title: `Max withdrawal`,
    content: `Your balance for the asset minus what's being held in open orders or required as margin.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const repayTooltips = {
  repayConvertEstimatedPrice: {
    title: `Estimated Price`,
    content: `This is the estimated conversion price. The actual price can vary depending on the state of the orderbook and slippage tolerance.`,
  },
  repayAmountBorrowing: {
    title: `Amount borrowing`,
    content: `The current amount of the asset you are borrowing.`,
  },
  repayConvertMaxRepay: {
    title: `Max Repay`,
    content: `The maximum amount you can repay via a market convert order. In cases where your margin usage is high, you may not be able to repay your full borrow even if you have enough deposited for the asset you are selling. In these cases, please deposit instead.`,
  },
  repayDepositMaxDeposit: {
    title: `Max Deposit`,
    content: `The total amount you have in your wallet to deposit and repay.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const bridgeTooltips = {
  bridgeEstimatedReceiveAmount: {
    title: `Estimated Receive Amount`,
    content: `The estimated amount you will receive after bridging. This takes into account the Axelar Fee.`,
  },
  bridgeEstimatedGas: {
    title: `Estimated Gas Fee`,
    content: `The estimated gas fee for this bridge transaction. Please ensure you have sufficient funds on the source chain to pay for gas.`,
  },
  bridgeEstimatedTime: {
    title: `Estimated Time`,
    content: `The estimated time it will take to bridge. This can vary depending on network congestion.`,
  },
  bridgeAxelarFee: {
    title: `Axelar Fee`,
    content: `The fees collected by Axelar for facilitating this bridge transaction.`,
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const stakingTooltips = {
  stakingEstConversionRate: ({ primaryQuoteToken }) => ({
    title: `Est. Conversion Rate`,
    content: `Compounding converts ${primaryQuoteToken.symbol} rewards into ${VRTX_TOKEN_INFO.symbol} using Camelot and then stakes them. The estimated conversion rate is based on the current price for the ${VRTX_TOKEN_INFO.symbol}-${primaryQuoteToken.symbol} market on Camelot.`,
  }),
} as const satisfies Record<string, DefinitionTooltipConfig>;

export const dialogTooltips = {
  ...singleSignatureTooltips,
  ...depositTooltips,
  ...withdrawTooltips,
  ...repayTooltips,
  ...takeProfitStopLossTooltips,
  ...stakingTooltips,
  ...bridgeTooltips,
  ...settingsTooltips,
} as const satisfies Record<string, DefinitionTooltipConfig>;
