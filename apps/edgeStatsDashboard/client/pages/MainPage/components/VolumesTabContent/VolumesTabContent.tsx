import { VolumeByChainEnvChartSection } from 'client/pages/MainPage/components/common/VolumeByChainEnvChartSection/VolumeByChainEnvChartSection';
import { EdgeSpotPerpVolumeChartsSection } from 'client/pages/MainPage/components/VolumesTabContent/EdgeSpotPerpVolumeChartsSection/EdgeSpotPerpVolumeChartsSection';
import { EdgeVolumePieChartsSection } from 'client/pages/MainPage/components/VolumesTabContent/EdgeVolumePieChartsSection/EdgeVolumePieChartsSection';
import { VolumeByChainEnvCardsSection } from 'client/pages/MainPage/components/VolumesTabContent/VolumeByChainEnvCardsSection/VolumeByChainEnvCardsSection';

export function VolumesTabContent() {
  return (
    <>
      <VolumeByChainEnvChartSection />
      <VolumeByChainEnvCardsSection />
      <EdgeVolumePieChartsSection />
      <EdgeSpotPerpVolumeChartsSection />
    </>
  );
}
