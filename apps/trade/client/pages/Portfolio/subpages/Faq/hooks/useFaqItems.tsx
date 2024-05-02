import { DiscList } from '@vertex-protocol/web-ui';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { LINKS } from 'client/modules/brand/links';
import { LiquidationRiskBars } from 'client/pages/Portfolio/components/LiquidationRiskBars';
import { ReactNode } from 'react';
import { FaqDefinition } from '../components/FaqDefinition';

export interface FaqItem {
  title: string;
  content: ReactNode;
}

export function useFaqItems(): FaqItem[] {
  const { primaryQuoteToken } = useVertexMetadataContext();

  return [
    {
      title: 'Why do I need to deposit?',
      content:
        'Traders must deposit collateral into smart contracts which enables them to take on leverage within the system. The smart contracts are audited and non-custodial which means you can withdraw your available funds at any point.',
    },
    {
      title: 'Do I control my assets?',
      content:
        'Yes. Only you can trade and access your funds. The smart contracts are non-custodial, which means you are in control of your assets.',
    },
    {
      title: 'What is cross-margin trading, and how does that make it unique?',
      content: (
        <FaqDefinition.Container>
          <p>
            Cross-margin trading is a type of margin system whereby traders can
            utilize multiple forms of collateral and margin is shared across
            positions.
          </p>
          <p>
            Every asset and liability will have an impact on your margin. This
            form of portfolio margining lets you make the most of your assets
            while offsetting liabilities.
          </p>
          <DiscList.Container>
            <DiscList.Item>
              <FaqDefinition.WhiteText className="font-bold">
                Assets:
              </FaqDefinition.WhiteText>{' '}
              Deposits, Positive PnL, Pools, and Spreads
            </DiscList.Item>
            <DiscList.Item>
              <FaqDefinition.WhiteText className="font-bold">
                Liabilities:
              </FaqDefinition.WhiteText>{' '}
              Perp Positions, Negative PnL, and Borrows
            </DiscList.Item>
          </DiscList.Container>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'How do I earn interest on deposits?',
      content: (
        <FaqDefinition.Container>
          <p>Interest is automatically earned on deposited assets.</p>
          <p>
            Money markets are integrated into the protocol to facilitate
            leveraged spot trading and borrowing. All deposits automatically
            participate in the underlying money market. The trustless smart
            contracts ensure that borrowers always maintain margin requirements.
          </p>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'What are the fees?',
      content: (
        <FaqDefinition.Container>
          <DiscList.Container>
            <DiscList.Item>
              <FaqDefinition.WhiteText className="font-bold">
                Maker fees
              </FaqDefinition.WhiteText>{' '}
              = 0% for ALL markets
            </DiscList.Item>
            <DiscList.Item>
              <FaqDefinition.WhiteText className="font-bold">
                Taker fees
              </FaqDefinition.WhiteText>{' '}
              = 0.02% for ALL markets
            </DiscList.Item>
          </DiscList.Container>
          <p>
            <FaqDefinition.WhiteText className="font-bold">
              Maker fees
            </FaqDefinition.WhiteText>{' '}
            are applied to orders that add liquidity to the orderbook, such as{' '}
            <FaqDefinition.WhiteText>limit orders</FaqDefinition.WhiteText> that
            don’t immediately cross the book.
          </p>
          <p>
            <FaqDefinition.WhiteText className="font-bold">
              Taker fees
            </FaqDefinition.WhiteText>{' '}
            are applied to orders that do immediately cross the book, such as{' '}
            <FaqDefinition.WhiteText>market orders.</FaqDefinition.WhiteText>
          </p>
          <div>
            <FaqDefinition.PurpleLinkButton href={LINKS.faqFeesDocs}>
              Learn more
            </FaqDefinition.PurpleLinkButton>{' '}
            about fees.
          </div>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'Are there Take Profit and Stop Loss Orders?',
      content: (
        <FaqDefinition.Container>
          <p>
            Yes, traders can set TP/SL orders for open perpeputal positions.
          </p>
          <div>
            <FaqDefinition.PurpleLinkButton href={LINKS.tpslDocs}>
              Learn more
            </FaqDefinition.PurpleLinkButton>{' '}
            about TP/SL
          </div>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'Why do I have less funds available than what I deposited?',
      content: (
        <FaqDefinition.Container>
          <p>
            “I deposited $50, why does it say I only have $40 to trade with?”
          </p>
          <p>
            Your Funds Available represents the value of your collateral
            weighted by the initial margin weights of the deposited asset. Since
            this is a cross-margin trading protocol, this means you can utilize
            different types of collateral as margin. Because certain types of
            collateral are more volatile than others, a discounted weight is
            applied to determine the impact of collateral on your Funds
            Available.
          </p>
          <p>That said, {primaryQuoteToken.symbol} is 1:1 with face value.</p>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'Is there a minimum amount to trade?',
      content: (
        <FaqDefinition.Container>
          <p>
            There is no minimum deposit amount or minimum $ value per trade.
          </p>
          <p>
            There is a{' '}
            <FaqDefinition.WhiteText>
              minimum order size
            </FaqDefinition.WhiteText>{' '}
            per market. That is, the minimum amount you must buy or sell for
            that market denominated in the asset - i.e. ‘ETH’ or ‘ETH-PERP’.
            Trades that don’t meet the minimum order size will not be valid and
            the frontend will prompt you to adjust.
          </p>
          <FaqDefinition.Section>
            <p>To learn about the minimum order size for each market:</p>
            <DiscList.Container>
              <DiscList.Item>
                Click on{' '}
                <FaqDefinition.WhiteText>
                  Market Details
                </FaqDefinition.WhiteText>
              </DiscList.Item>
              <DiscList.Item>
                <FaqDefinition.PurpleLinkButton href={LINKS.productSpecDocs}>
                  Visit product spec docs
                </FaqDefinition.PurpleLinkButton>
              </DiscList.Item>
            </DiscList.Container>
          </FaqDefinition.Section>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'Why is there a negative sign in front of my asset balance?',
      content:
        'A negative sign in front of an asset’s balance means you are currently borrowing that asset.',
    },
    {
      title: `I didn’t borrow ${primaryQuoteToken.symbol}, why is my balance negative?`,
      content: (
        <FaqDefinition.Container>
          <p>
            This could happen because you have perp positions with negative PnL
            and non-{primaryQuoteToken.symbol} assets as collateral.
          </p>
          <p>
            The protocol automatically settles PnL ({primaryQuoteToken.symbol})
            between losing and winning positions throughout the duration of
            holding a position. If you have a perp position with negative PnL,
            but you don’t have any {primaryQuoteToken.symbol}, the protocol will
            borrow {primaryQuoteToken.symbol} on your behalf to settle the PnL.
            This results in a negative {primaryQuoteToken.symbol} balance. The
            same will happen if you close the negative PnL position entirely.
          </p>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'How do I repay borrows?',
      content: (
        <FaqDefinition.Container>
          <FaqDefinition.Section>
            <p>Click on the Repay button:</p>
            <DiscList.Container>
              <DiscList.Item>
                In the balances table - click on the dropdown (right-most side)
              </DiscList.Item>
              <DiscList.Item>
                In the navbar - click on your wallet address (top-right side)
              </DiscList.Item>
            </DiscList.Container>
          </FaqDefinition.Section>
          <FaqDefinition.Section>
            <p>You have 2 options when it comes to Repaying:</p>
            <DiscList.Container>
              <DiscList.Item>
                Deposit the amount you’re borrowing to settle the borrowed
                balance
              </DiscList.Item>
              <DiscList.Item>
                Convert (sell) another balance to settle the borrowed balance -
                i.e. sell wETH for {primaryQuoteToken.symbol} to repay a{' '}
                {primaryQuoteToken.symbol} borrow
              </DiscList.Item>
            </DiscList.Container>
          </FaqDefinition.Section>
        </FaqDefinition.Container>
      ),
    },
    {
      title:
        'Why was my position liquidated if the chart shows that the price didn’t hit my Liq. Price?',
      content: (
        <FaqDefinition.Container>
          <p>
            The Liq. Price displayed in the Perp Positions table is an estimated
            Liq. Price based on your current account and the position’s health.
            If you have multiple positions open, the Liq. Price is subject to
            the health changes of your other positions.
          </p>
          <p>
            Perpetuals are liquidated based on the given market&apos;s Oracle
            Price - provided by the Stork Oracle. The Oracle Price is submitted
            to smart contracts based on time intervals or price movements. When
            an account gets liquidated, it is because the Oracle Price caused
            the account to fall under maintenance margin requirements.
          </p>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'How do Liquidations work?',
      content: (
        <>
          <FaqDefinition.Container>
            <p>
              An account is eligible for liquidation once either of the
              following has occured:
            </p>
            <DiscList.Container>
              <DiscList.Item>Funds Until Liq = $0</DiscList.Item>
              <DiscList.Item>Liq. Risk = 100%</DiscList.Item>
            </DiscList.Container>
            <p>
              The riskiest positions/balances will get liquidated first, until
              the account is no longer eligible for liquidation.
            </p>
          </FaqDefinition.Container>
        </>
      ),
    },
    {
      title: 'What is Margin Usage?',
      content: (
        <FaqDefinition.Container>
          <p>
            Margin Usage is the percentage of your initial margin being used by
            open positions. In other words, it’s how much of your tradeable
            collateral is in use.
          </p>
          <p>
            If Margin Usage reaches 100%, you cannot initiate new positions.
          </p>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'What is Funds Available?',
      content: (
        <FaqDefinition.Container>
          <p>
            The amount of tradeable funds/collateral you have in your account.
            This is the initial weighted margin you have unused.
          </p>
          <p>
            If your Funds Available reaches $0, you cannot initiate new
            positions.
          </p>
          <p>This can also be known as Free Collateral or Available Margin.</p>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'What is Funds Until Liq?',
      content: (
        <FaqDefinition.Container>
          <p>
            The amount of funds/collateral in your account until liquidation. If
            it reaches $0, your account will be at risk of liquidation.
          </p>
          <p>
            You must maintain a Funds Until Liq. above $0 to avoid being
            liquidated.
          </p>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'What is Liq. Risk?',
      content: (
        <FaqDefinition.Container>
          <p>
            The percentage of your maintenance margin that is being used by
            positions.
          </p>
          <DiscList.Container>
            <DiscList.Item>
              Also known as:{' '}
              <FaqDefinition.WhiteText className="font-bold">
                Maintenance Margin Usage
              </FaqDefinition.WhiteText>
            </DiscList.Item>
            <DiscList.Item>
              If it reaches 100%, you’re at risk of liquidation.
            </DiscList.Item>
          </DiscList.Container>
          <div className="grid w-full grid-cols-2 gap-x-8 gap-y-3 px-1 text-xs sm:grid-cols-4">
            <LiquidationRiskBars />
          </div>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'What are initial and maintenance weights?',
      content: (
        <FaqDefinition.Container>
          <p>
            For an exchange that only accepts dollar-pegged collateral,
            collateral is typically weighted at face value.
          </p>
          <p>
            In a{' '}
            <FaqDefinition.WhiteText>
              cross-margin system
            </FaqDefinition.WhiteText>{' '}
            that accepts multiple forms of collateral, weights are used to
            discount collaterals that are more volatile. Most trading venues
            will use 2 weights - ‘Initial’ and ‘Maintenance’.
          </p>
          <FaqDefinition.Section>
            <FaqDefinition.WhiteText>Initial Weight</FaqDefinition.WhiteText>
            <p>
              is used to determine the amount of collateral an account has to
              initiate positions - i.e. for trading.
            </p>
          </FaqDefinition.Section>
          <FaqDefinition.Section>
            <FaqDefinition.WhiteText>
              Maintenance Weight
            </FaqDefinition.WhiteText>
            <p>
              is used to determine the margin to maintain positions - i.e. to
              avoid liquidation.
            </p>
          </FaqDefinition.Section>
        </FaqDefinition.Container>
      ),
    },
    {
      title: 'Initial vs. Maintenance Margin',
      content: (
        <FaqDefinition.Container>
          <p>
            Initial and maintenance weighted margins give traders an idea of
            their account’s health through two metrics: its ability to trade and
            how close it is to liquidation.
          </p>
          <FaqDefinition.Section>
            <FaqDefinition.WhiteText>Initial Margin</FaqDefinition.WhiteText>
            <p>
              The amount of funds your account has to trade with. This is the
              sum of your initial weighted collateral minus initial weighted
              margin requirements.
            </p>
          </FaqDefinition.Section>
          <FaqDefinition.Section>
            <FaqDefinition.WhiteText>
              Maintenance Margin
            </FaqDefinition.WhiteText>
            <p>
              The amount of funds your account must maintain before it will be
              liquidated. This is the sum of your maintenance weighted
              collateral minus maintenance weighted margin requirements.
            </p>
          </FaqDefinition.Section>
        </FaqDefinition.Container>
      ),
    },
  ];
}
