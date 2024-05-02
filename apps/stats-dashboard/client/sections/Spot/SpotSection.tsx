import { SpotSectionCards } from './SpotSectionCards';
import { TimespanSelect } from 'client/modules/selects/components/TimespanSelect';
import { MarketSelect } from 'client/modules/selects/components/MarketSelect';
import { Section } from 'client/modules/section/Section';

export function SpotSection() {
  return (
    <Section.Container>
      <SpotSectionCards />
      <Section.Subheader className="justify-between">
        {/* Pass in spot markets to MarketSelect */}
        <MarketSelect />
        <TimespanSelect />
      </Section.Subheader>
    </Section.Container>
  );
}
