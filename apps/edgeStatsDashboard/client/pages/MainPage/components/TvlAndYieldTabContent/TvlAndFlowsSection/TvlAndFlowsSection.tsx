import { StatsSection } from 'client/components/StatsSection';
import { TvlByChainEnvChartSection } from 'client/pages/MainPage/components/common/TvlByChainEnvChartSection/TvlByChainEnvChartSection';
import { EdgeFlowsChartSection } from 'client/pages/MainPage/components/TvlAndYieldTabContent/TvlAndFlowsSection/EdgeFlowsChartSection';

export function TvlAndFlowsSection() {
  return (
    <StatsSection className="sm:grid-cols-2 sm:items-end">
      <TvlByChainEnvChartSection />
      <EdgeFlowsChartSection />
    </StatsSection>
  );
}
