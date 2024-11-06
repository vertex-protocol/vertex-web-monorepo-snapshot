import { BigDecimals } from '@vertex-protocol/utils';
import { MarginManagerDefinition } from 'client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/MarginManagerDefinition';
import { SignOfValuePill } from 'client/pages/Portfolio/subpages/MarginManager/components/SignOfValuePill';

const { ContentContainer, Description, Section, Title, InfoCard } =
  MarginManagerDefinition;

export function HowToUseTheMarginManagerDefinition() {
  return (
    <ContentContainer>
      <Section>
        <Title>What is the Margin Manager?</Title>
        <Description>
          The Margin Manager is a tool that displays all account balances,
          positions and the impact they have on your margin.
        </Description>
      </Section>
      <Section>
        <Title>How to use the Margin Manager</Title>
        <Description>
          On the right of each table is the initial and maintenance weights for
          your balances and positions. This is accompanied with the
          corresponding margin impact (plus & minus signs):
        </Description>
      </Section>
      <Section>
        <div className="flex gap-x-3">
          <SignOfValuePill className="my-1" value={BigDecimals.ONE} />
          <Description>
            The plus sign indicates your contribution to your margin account.
            This is considered collateral.
          </Description>
        </div>
        <div className="flex gap-x-3">
          <SignOfValuePill className="my-1" value={BigDecimals.ONE.negated()} />
          <Description>
            The minus sign indicates it requires collateral and is using your
            collateral.
          </Description>
        </div>
      </Section>
      <Description>
        The balances, perps, pools, and spreads tables have different formulas
        for determining the margin impact.
      </Description>
      <Section>
        <InfoCard>
          To learn what each formula is, hover over the calculator icon in the
          top right of each table
        </InfoCard>
      </Section>
      <Description>
        Understanding the impact of each balance and position is important for
        managing your account and risk of liquidation.
      </Description>
      <Section>
        <InfoCard>
          You can use the 3 dot drop down to the right of each line item for
          quick access to relevant actions
        </InfoCard>
        <Section>
          <div>
            <Title>Balances</Title>
            <Description>Deposit, withdraw, repay and borrow</Description>
          </div>
          <div>
            <Title>Perps</Title>
            <Description>Close position</Description>
          </div>
          <div>
            <Title>Pools</Title>
            <Description>Provide/withdraw liquidity</Description>
          </div>
          <div>
            <Title>Spreads</Title>
            <Description>Trade spot or perp</Description>
          </div>
        </Section>
      </Section>
      <Section>
        <Title>Summary</Title>
        <Description>
          The Margin Manager helps you visualize how everything in your
          portfolio is connected to one universal margin account. Understanding
          the impact each balance and position has on your margin is important
          for managing the funds your account has to trade with and for
          understanding your risk of liquidation.
        </Description>
      </Section>
    </ContentContainer>
  );
}
