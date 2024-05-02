import { OverviewSectionCards } from './OverviewSectionCards';
import { TimespanSelect } from 'client/modules/selects/components/TimespanSelect';
import { Section } from 'client/modules/section/Section';

export function OverviewSection() {
  return (
    <Section.Container>
      <OverviewSectionCards />
      <Section.Subheader className="justify-end">
        <TimespanSelect />
      </Section.Subheader>
    </Section.Container>
  );
}
