import { AppPage } from 'client/modules/app/AppPage';
import { StatsLinkButton } from 'client/pages/Markets/components/StatsLinkButton';

export function MarketsPageHeader() {
  return (
    <div className="flex justify-between">
      <AppPage.Header title="Markets" />
      <StatsLinkButton />
    </div>
  );
}
