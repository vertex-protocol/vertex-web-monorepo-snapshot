import { MarketsPage } from 'client/pages/Markets/MarketsPage';
import { Metadata } from 'next';

export default function Markets() {
  return <MarketsPage />;
}

export const metadata: Metadata = {
  title: 'Markets',
};
