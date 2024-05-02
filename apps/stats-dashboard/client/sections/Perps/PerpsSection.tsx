import { PerpsSectionCards } from './PerpsSectionCards';
import { TimespanSelect } from 'client/modules/selects/components/TimespanSelect';
import { MarketSelect } from 'client/modules/selects/components/MarketSelect';
import { Section } from 'client/modules/section/Section';

export function PerpsSection() {
  return (
    <Section.Container>
      <PerpsSectionCards />
      <Section.Subheader className="justify-between">
        {/* Pass in perp markets to MarketSelect */}
        <MarketSelect />
        <TimespanSelect />
      </Section.Subheader>
    </Section.Container>
  );
}
