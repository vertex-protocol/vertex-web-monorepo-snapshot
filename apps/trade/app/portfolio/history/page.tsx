import { PortfolioHistoryPage } from 'client/pages/Portfolio/subpages/History/PortfolioHistoryPage';
import { Metadata } from 'next';

export default function HistoryPage() {
  return <PortfolioHistoryPage />;
}

export const metadata: Metadata = {
  title: 'History',
};
