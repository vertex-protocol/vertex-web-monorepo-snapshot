import { DiscList } from '@vertex-protocol/web-ui';
import { MarginManagerDefinition } from './MarginManagerDefinition';

const {
  ContentContainer,
  Description,
  Section,
  Title,
  InfoPill,
  InfoCard,
  GradientText,
} = MarginManagerDefinition;

export function MarginUsageAndFundsAvailableDefinition() {
  return (
    <ContentContainer>
      <Section>
        <Title className="flex items-center gap-x-4">
          Margin Usage &amp; Funds Available
          <InfoPill>Initial Margin</InfoPill>
        </Title>
        <Description>
          In the Initial Margin card above you will find 2 terms: Margin Usage
          and Funds Available. Both of these give you an idea of the state of
          your initial margin in easy to understand metrics.
        </Description>
      </Section>
      <Section>
        <div>
          <Title>Margin Usage (%)</Title>
          <DiscList.Container>
            <DiscList.Item>
              The percentage of your margin being used by open positions
            </DiscList.Item>
            <DiscList.Item>
              If it reaches 100%, then you cannot initiate new positions
            </DiscList.Item>
          </DiscList.Container>
        </div>
        <div>
          <Title>Funds Available ($)</Title>
          <DiscList.Container>
            <DiscList.Item>
              The amount of funds/collateral your account has to trade with
            </DiscList.Item>
            <DiscList.Item>
              Also known as: <GradientText>Free Collateral</GradientText> or{' '}
              <GradientText>Available Margin</GradientText>
            </DiscList.Item>
            <DiscList.Item>
              This is the net sum of init. Margin columns
            </DiscList.Item>
            <DiscList.Item>
              If $0, then you cannot initiate new positions
            </DiscList.Item>
          </DiscList.Container>
        </div>
      </Section>
      <InfoCard>
        Funds Available can also be known as{' '}
        <span className="font-bold">Free Collateral</span> or{' '}
        <span className="font-bold">Available Margin</span>
      </InfoCard>
      <Description>
        As you can see, both of these terms represent the same metric
        differently. Margin Usage increases as your initial margin is used up,
        while Funds Available decreases.
      </Description>
    </ContentContainer>
  );
}
