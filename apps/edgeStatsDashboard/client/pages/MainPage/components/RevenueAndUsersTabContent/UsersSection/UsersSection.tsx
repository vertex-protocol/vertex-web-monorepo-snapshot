import { StatsSection } from 'client/components/StatsSection';
import { ActiveUsersChartSection } from 'client/pages/MainPage/components/common/ActiveUsersChartSection/ActiveUsersChartSection';
import { UserBaseChartSection } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/UsersSection/UserBaseChartSection/UserBaseChartSection';

export function UsersSection() {
  return (
    <StatsSection className="sm:grid-cols-2">
      <UserBaseChartSection />
      <ActiveUsersChartSection showTotalTradersMetric={false} />
    </StatsSection>
  );
}
