import { DiscList } from '@vertex-protocol/web-ui';
import { LiquidationRiskBars } from 'client/pages/Portfolio/components/LiquidationRiskBars';
import { MarginManagerDefinition } from './MarginManagerDefinition';

const { ContentContainer, Description, Section, Title, Pill, GradientText } =
  MarginManagerDefinition;

export function LiquidationRiskAndFundsAvailableDefinition() {
  return (
    <ContentContainer>
      <Section>
        <Title className="flex items-center gap-x-4">
          Funds Until Liq &amp; Liq Risk.
          <Pill>Maintenance Margin</Pill>
        </Title>
        <Description>
          In the Maintenance Margin card above you will find 2 terms: Funds
          Until Liq. and Liq. Risk. Both of these give you an idea of the state
          of your maintenance margin in easy to understand metrics.
        </Description>
      </Section>
      <Section>
        <div>
          <Title>Funds Until Liq. ($)</Title>
          <DiscList.Container>
            <DiscList.Item>
              The amount of funds your account has until liquidation
            </DiscList.Item>
            <DiscList.Item>
              This is the net sum of all Maint. Margin columns
            </DiscList.Item>
            <DiscList.Item>
              You must maintain a positive value. If it reaches $0, your account
              will start getting liquidated
            </DiscList.Item>
          </DiscList.Container>
        </div>
        <div>
          <Title>Liquidation Risk (%)</Title>
          <DiscList.Container>
            <DiscList.Item>
              The amount of your maintenance margin that is being used by
              positions{' '}
            </DiscList.Item>
            <DiscList.Item>
              Also known as:{' '}
              <GradientText>Maintenance Margin Usage </GradientText>
            </DiscList.Item>
            <DiscList.Item>
              If it reaches 100%, your account will start getting liquidated
            </DiscList.Item>
          </DiscList.Container>
        </div>
      </Section>
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 lg:grid-cols-4">
        <LiquidationRiskBars />
      </div>
      <Description>
        As you can see, both of these terms represent the same metric
        differently. Liq. Risk increases as your maintenance margin is used, and
        Funds Until Liq. decreases.
      </Description>
    </ContentContainer>
  );
}
