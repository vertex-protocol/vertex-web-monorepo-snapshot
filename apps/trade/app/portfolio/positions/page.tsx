import { PortfolioPerpPositionsPage } from 'client/pages/Portfolio/subpages/Perpetuals/PortfolioPerpPositionsPage';
import { Metadata } from 'next';

export default function PerpPositionsPage() {
  return <PortfolioPerpPositionsPage />;
}

export const metadata: Metadata = {
  title: 'Positions',
};
