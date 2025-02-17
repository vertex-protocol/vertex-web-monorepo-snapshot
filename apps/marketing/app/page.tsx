import { HeroSection } from 'client/sections/HeroSection/HeroSection';
import dynamic from 'next/dynamic';
import React from 'react';

const BelowFoldSections = dynamic(
  () => import('client/sections/BelowFoldSections/BelowFoldSections'),
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <BelowFoldSections />
    </>
  );
}
