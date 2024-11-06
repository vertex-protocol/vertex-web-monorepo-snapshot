import { PortfolioMarginManagerPage } from 'client/pages/Portfolio/subpages/MarginManager/PortfolioMarginManagerPage';
import { Metadata } from 'next';

export default function MarginManagerPage() {
  return <PortfolioMarginManagerPage />;
}

export const metadata: Metadata = {
  title: 'Margin Manager',
};
