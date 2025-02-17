'use client';
import { FeaturesSection } from 'client/sections/FeaturesSection/FeaturesSection';
import { MultiChainSection } from 'client/sections/MultiChainSection/MultiChainSection';
import { ComparisonSection } from 'client/sections/ComparisonSection/ComparisonSection';
import { VrtxSection } from 'client/sections/VrtxSection/VrtxSection';
import { ToolsTradeSection } from 'client/sections/ToolsTradeSection/ToolsTradeSection';
import { PartnersSection } from 'client/sections/PartnersSection/PartnersSection';
import { EcosystemSection } from 'client/sections/EcosystemSection/EcosystemSection';

export default function BelowFoldSections() {
  return (
    <>
      <FeaturesSection />
      <MultiChainSection />
      <ComparisonSection />
      <VrtxSection />
      <ToolsTradeSection />
      <PartnersSection />
      <EcosystemSection />
    </>
  );
}
