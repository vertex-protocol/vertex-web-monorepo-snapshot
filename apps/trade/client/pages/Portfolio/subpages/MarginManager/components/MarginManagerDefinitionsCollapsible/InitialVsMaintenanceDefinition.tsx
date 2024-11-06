import { MarginManagerDefinition } from 'client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/MarginManagerDefinition';

const { ContentContainer, Description, Section, Title, InfoCard } =
  MarginManagerDefinition;

export function InitialVsMaintenanceDefinition() {
  return (
    <ContentContainer>
      <Section>
        <Title>Initial vs. Maintenance</Title>
        <Description>
          Initial and maintenance weighted margins give traders an idea of their
          account’s health through two metrics: its ability to trade and how
          close it is to liquidation.
        </Description>
        <Description>
          Using weighted formulas, we can determine the margin impact of every
          balance and position your account has open. The sum of these provides
          you with 2 weighted account values:
        </Description>
      </Section>
      <Section>
        <div>
          <Title>Initial margin</Title>
          <Description>
            The amount of funds your account has to trade with (also ‘Funds
            Available’).
          </Description>
        </div>
        <div>
          <Title>Maintenance margin</Title>
          <Description>
            The amount of funds your account must maintain before it will be
            liquidated (also ‘Funds Until Liq’)
          </Description>
        </div>
      </Section>
      <InfoCard>
        To calculate your margin values, simply sum up the Init. Margin or
        Maint. Margin columns.
      </InfoCard>
    </ContentContainer>
  );
}
