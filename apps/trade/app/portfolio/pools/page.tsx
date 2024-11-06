import { PortfolioPoolsPage } from 'client/pages/Portfolio/subpages/Pools/PortfolioPoolsPage';
import { Metadata } from 'next';

export default function PoolsPage() {
  return <PortfolioPoolsPage />;
}

export const metadata: Metadata = {
  title: 'Pools',
};
