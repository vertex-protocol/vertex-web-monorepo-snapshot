import { MoneyMarketsCards } from './MoneyMarketsCards';
import { TimespanSelect } from 'client/modules/selects/components/TimespanSelect';
import { MarketSelect } from 'client/modules/selects/components/MarketSelect';
import { Section } from 'client/modules/section/Section';

export function MoneyMarketsSection() {
  return (
    <Section.Container>
      <MoneyMarketsCards />
      <Section.Subheader className="justify-between">
        {/* Pass in money markets to MarketSelect */}
        <MarketSelect />
        <TimespanSelect />
      </Section.Subheader>
    </Section.Container>
  );
}
