import { StatsSection } from 'client/components/StatsSection';
import { ActiveUsersChartSection } from 'client/pages/MainPage/components/common/ActiveUsersChartSection/ActiveUsersChartSection';
import { OpenInterestByChainEnvChartSection } from 'client/pages/MainPage/components/common/OpenInterestByChainEnvSection/OpenInterestByChainEnvChartSection';
import { TvlByChainEnvChartSection } from 'client/pages/MainPage/components/common/TvlByChainEnvChartSection/TvlByChainEnvChartSection';
import { VolumeByChainEnvChartSection } from 'client/pages/MainPage/components/common/VolumeByChainEnvChartSection/VolumeByChainEnvChartSection';

export function OverviewTabContent() {
  return (
    <>
      <StatsSection className="sm:grid-cols-2">
        <VolumeByChainEnvChartSection />
        <OpenInterestByChainEnvChartSection />
      </StatsSection>
      <StatsSection className="sm:grid-cols-2 sm:items-end">
        <TvlByChainEnvChartSection />
        <ActiveUsersChartSection showTotalTradersMetric />
      </StatsSection>
    </>
  );
}
