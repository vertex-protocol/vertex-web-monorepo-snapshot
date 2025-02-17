import { PerpTradingPage } from 'client/pages/PerpTrading/PerpTradingPage';
import { Metadata } from 'next';

export default function Perpetuals() {
  return <PerpTradingPage />;
}

export const metadata: Metadata = {
  title: 'Perpetuals',
};
