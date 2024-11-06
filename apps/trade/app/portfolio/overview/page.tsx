import { PortfolioOverviewPage } from 'client/pages/Portfolio/subpages/Overview/PortfolioOverviewPage';
import { Metadata } from 'next';

export default function OverviewPage() {
  return <PortfolioOverviewPage />;
}

export const metadata: Metadata = {
  title: 'Overview',
};
