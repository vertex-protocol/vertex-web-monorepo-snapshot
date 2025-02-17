'use client';

import { Hero } from 'client/components/Hero/Hero';
import { HeroMetrics } from 'client/components/Hero/HeroMetrics';
import { Section } from 'client/components/Section/Section';
import { SECTION_IDS } from 'config/links';

export function HeroSection() {
  return (
    <Section
      id={SECTION_IDS.hero}
      className="flex min-h-[80vh] pb-32 pt-32 md:pt-[15vh]"
      asMotion
      mode="sync"
      aria-labelledby="hero-title"
    >
      <div className="container-custom flex w-full flex-col items-center justify-center gap-y-12 text-center">
        <Hero />
        <HeroMetrics />
      </div>
    </Section>
  );
}
