import { PortfolioOpenOrdersPage } from 'client/pages/Portfolio/subpages/OpenOrders/PortfolioOpenOrdersPage';
import { Metadata } from 'next';

export default function OpenOrdersPage() {
  return <PortfolioOpenOrdersPage />;
}

export const metadata: Metadata = {
  title: 'Orders',
};
