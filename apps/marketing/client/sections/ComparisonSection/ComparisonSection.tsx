'use client';

import { ComparisonTable } from 'client/components/ComparisonTable/ComparisonTable';
import { MobileComparisonTable } from 'client/components/ComparisonTable/MobileComparisonTable';
import { Container } from 'client/components/Container/Container';
import { BlurRevealText } from 'client/components/RevealText/BlurRevealText';
import { Section } from 'client/components/Section/Section';
import { SECTION_IDS } from 'config/links';

export function ComparisonSection() {
  return (
    <Section id={SECTION_IDS.compare} asMotion mode="wait">
      <Container>
        <BlurRevealText
          texts={[
            {
              element: 'h2',
              text: 'Set the Standard',
              className:
                'text-header-2 md:text-header-1 font-radioGrotesk mb-4',
            },
            {
              element: 'p',
              text: "Vertex doesn't just meet expectations - it sets them.",
              className: 'text-body-14 md:text-body-16 text-body-gray',
            },
          ]}
        />
        <MobileComparisonTable />
        <ComparisonTable />
      </Container>
    </Section>
  );
}
