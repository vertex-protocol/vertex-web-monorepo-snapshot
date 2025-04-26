import { VLP_TOKEN_INFO } from '@vertex-protocol/react-client';
import { DiscList } from '@vertex-protocol/web-ui';
import { SEQUENCER_FEE_AMOUNT_USDC } from 'client/consts/sequencerFee';
import { DefinitionTooltipConfig } from 'client/modules/tooltips/DefinitionTooltip/types';
import { PerpMarginModeCrossInfo } from 'client/modules/trading/components/PerpMarginModeCrossInfo';
import { PerpMarginModeIsolatedInfo } from 'client/modules/trading/components/PerpMarginModeIsolatedInfo';

const settingsTooltips = {
  settingsOrderNotifications: {
    title: 'Order Notifications',
    content: `Enable notifications for order placements, fills, and cancels.`,
  },
  settingsChartOrderLines: {
    title: 'Chart Order Lines',
    content: `Enable order lines on the price chart.`,
  },
  settingsDefaultMarginMode: {
    title: 'Default Margin Mode',
    content: `The default margin mode used for markets you have not traded before.`,
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
    content: `When enabled, you will not be required to approve 1-Click Trading again unless you clear your browser cache. Your 1-Click Trading key will be saved to your browser's storage and will not persist across devices. Do not enable this feature on shared or public devices.`,
  },
  octRemainingActivations: {
    title: `Weekly activations remaining`,
    content:
      'You are allowed to enable 1-Click Trading up to 5 times per week. You can only disable 1CT after you have exceeded the quota, but cannot enable 1CT until the following week.',
  },
} as const satisfies Record<string, DefinitionTooltipConfig>;

const perpMarginModeTooltips = {
  perpMarginModeIsoInfo: {
    title: 'Isolated Margin',
    content: <PerpMarginModeIsolatedInfo />,
  },
  perpMarginModeCrossInfo: {
    title: `Cross Margin`,
    content: <PerpMarginModeCrossInfo />,
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
  automaticDepositApr: {
    title: `Deposit APR (Auto)`,
    content: `Your deposits/collateral automatically earn interest. You don't need to do anything extra. You can view the current APR on the balances table.`,
  },
};

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

const fastWithdrawTooltips = {
  fastWithdrawalFee: {
    title: `Fast Withdrawal Fee`,
    content: `The fee deducted from the withdrawal amount for using fast withdraw. This fee is used to cover costs for the fast withdrawal service and to prevent abuse from other users.`,
  },
};

const vlpTooltips = {
  vlpRedeemFee: ({ primaryQuoteToken: { symbol: primaryQuoteSymbol } }) => ({
    title: 'Fee',
    content: `The fee for burning ${VLP_TOKEN_INFO.symbol} is composed of a base sequencer gas fee of ${SEQUENCER_FEE_AMOUNT_USDC} ${primaryQuoteSymbol} and an additional fee that is redirected back to the pool.`,
  }),
} as const satisfies Record<string, DefinitionTooltipConfig>;

export const dialogTooltips = {
  ...singleSignatureTooltips,
  ...depositTooltips,
  ...repayTooltips,
  ...perpMarginModeTooltips,
  ...takeProfitStopLossTooltips,
  ...bridgeTooltips,
  ...settingsTooltips,
  ...fastWithdrawTooltips,
  ...vlpTooltips,
} as const satisfies Record<string, DefinitionTooltipConfig>;
