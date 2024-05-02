import { HomePageButton } from 'client/components/Button/HomePageButton';
import { EXTERNAL_LINKS } from 'client/consts';
import Link from 'next/link';

export type FaqDataType = {
  question: string;
  answer: React.ReactNode;
};

export const FAQ_DATA: FaqDataType[] = [
  {
    question: 'What do I need to start trading on Vertex?',
    answer: (
      <div className="flex flex-col gap-y-2 whitespace-pre-wrap">
        <p>
          Getting started is easy: All you need is a crypto wallet and some
          assets on Arbitrum. Don&apos;t worry, we can help you get them there!
        </p>
        <div>
          <span className="font-semibold">FIRST</span> - Connect
          <ul className="list-disc px-8">
            <li>
              <span>Have a crypto wallet?</span>
              &nbsp;-&gt; Simply connect.
            </li>
            <li>
              <span>New to crypto?</span>&nbsp;-&gt; Create a self-custodial
              wallet using your favorite social accounts in a few minutes.
            </li>
          </ul>
        </div>
        <div>
          <span className="font-semibold">SECOND</span> - Deposit funds to start
          trading, earning or borrowing
          <ul className="list-disc px-8">
            <li>
              <span>Have assets on Arbitrum?</span>
              &nbsp;-&gt; Deposit into Vertex
            </li>
            <li>
              <span>Don&apos;t have assets on Arbitrum?</span>&nbsp;-&gt; Bridge
              from other chains or deposit from CEXs.
            </li>
            <li>
              <span>New to crypto?</span>&nbsp;-&gt; Easily buy assets using
              fiat on Vertex.
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    question: 'Do I control my assets? ',
    answer: (
      <div className="whitespace-pre-wrap">
        YES! Vertex is always SELF-CUSTODIAL, meaning you control YOUR assets at
        ALL times. Deposits in Vertex&apos;s smart contracts not being used for
        trading can be withdrawn at any time. No frozen funds. Trust code.
      </div>
    ),
  },
  {
    question: 'What can I do on Vertex?',
    answer: (
      <div className="whitespace-pre-wrap">
        <ul className="list-disc px-8">
          <li>Buy and sell assets</li>
          <li>Trade perpetuals</li>
          <li>Use Leverage</li>
          <li>Deposit assets to earn yield</li>
          <li>Borrow Assets</li>
          <li>Fulfill all your trading needs and trade like a pro</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'Are my assets safe on layer 2?',
    answer: (
      <div className="whitespace-pre-wrap">
        In order to give you the best user experience, Vertex is built on
        Arbitrum - an Ethereum L2.{' '}
        <HomePageButton
          as={Link}
          className="hover:text-orange-primary px-1 py-0 text-blue-500 underline hover:no-underline"
          href={EXTERNAL_LINKS.arbitrum}
          external
        >
          Arbitrum
        </HomePageButton>{' '}
        is an optimistic rollup that improves Ethereum&apos;s scalability,
        offering faster transactions and lower fees while providing the security
        of Ethereum. Ethereum&apos;s security comes from it&apos;s consensus
        method, Proof-of-Stake, where a network of nodes (decentralization)
        validate transactions.
      </div>
    ),
  },
  {
    question: 'What deposits/collateral does Vertex accept?',
    answer: (
      <div className="whitespace-pre-wrap">
        Any spot market added to Vertex will be available as collateral options
        on Vertex. This means that you can hold and earn interest on your
        favorite assets while using them as margin to trade and borrow. As
        Vertex grows and introduces new spot markets, more options will become
        available.
      </div>
    ),
  },
  {
    question: 'How do I earn interest after depositing?',
    answer: (
      <div className="flex flex-col gap-y-4 whitespace-pre-wrap">
        <p>
          Vertex is built with an integrated money market at it&apos;s core.
          When you deposit assets into the protocol, other traders can borrow
          those assets to take leverage. Lenders are secured through
          over-collateralized smart-contracts.
        </p>
        <p>TLDR: Your assets are SAFE and EARN MORE on Vertex.</p>
      </div>
    ),
  },
];
