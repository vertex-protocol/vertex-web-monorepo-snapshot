import { MarginManagerDefinition } from 'client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/MarginManagerDefinition';

const { ContentContainer, Description, Section, Title, GradientText } =
  MarginManagerDefinition;

export function InitialAndMaintenanceWeightsDefinition() {
  return (
    <ContentContainer>
      <Section>
        <Title>What are Initial &amp; Maintenance Weights?</Title>
        <Section>
          <Description>
            For an exchange that only accepts dollar-pegged collateral,
            collateral is typically weighted at face value.
          </Description>
          <Description>
            In a <GradientText>cross-margin system</GradientText> that accepts
            multiple forms of collateral, weights are used to discount
            collaterals that are more volatile. Whether isolated or
            cross-margined, most trading venues will use 2 weights - ‘Initial’
            and ‘Maintenance’. 
          </Description>
        </Section>
      </Section>
      <Section>
        <div>
          <Title>Initial Weight</Title>
          <Description>
            is used to determine the amount of collateral an account has to
            initiate positions - i.e. for trading.
          </Description>
        </div>
        <div>
          <Title>Maintenance Weight</Title>
          <Description>
            is used to determine the margin to maintain positions - i.e. to
            avoid liquidation.
          </Description>
        </div>
      </Section>
    </ContentContainer>
  );
}
