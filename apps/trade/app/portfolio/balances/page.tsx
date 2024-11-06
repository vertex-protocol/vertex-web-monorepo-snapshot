import { PortfolioBalancesPage } from 'client/pages/Portfolio/subpages/Balances/PortfolioBalancesPage';
import { Metadata } from 'next';

export default function BalancesPage() {
  return <PortfolioBalancesPage />;
}

export const metadata: Metadata = {
  title: 'Balances',
};
