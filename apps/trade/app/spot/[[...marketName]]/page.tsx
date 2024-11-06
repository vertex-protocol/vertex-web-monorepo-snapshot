import { SpotTradingPage } from 'client/pages/SpotTrading/SpotTradingPage';
import { Metadata } from 'next';

export default function Spot() {
  return <SpotTradingPage />;
}

export const metadata: Metadata = {
  title: 'Spot',
};
