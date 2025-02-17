import { SonicPointsHeroCreditsCard } from 'client/pages/SonicPoints/components/hero/SonicPointsHeroCreditsCard/SonicPointsHeroCreditsCard';
import { SonicPointsHeroPointsCard } from 'client/pages/SonicPoints/components/hero/SonicPointsHeroPointsCard';
import { SonicPointsHeroVrtxCard } from 'client/pages/SonicPoints/components/hero/SonicPointsHeroVrtxCard';

export function SonicPointsHeroSection() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <SonicPointsHeroCreditsCard />
      <div className="grid grid-rows-2 gap-5">
        <SonicPointsHeroVrtxCard />
        <SonicPointsHeroPointsCard />
      </div>
    </div>
  );
}
