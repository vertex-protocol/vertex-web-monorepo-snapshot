import { AppPage } from 'client/modules/app/AppPage';
import { BlitzMarketBoostsDisclosure } from 'client/pages/Markets/components/BlitzMarketBoostsDisclosure';
import { MarketsCarouselBanner } from 'client/pages/Markets/components/MarketsCarouselBanner/MarketsCarouselBanner';
import { MarketsFirstCarousel } from 'client/pages/Markets/components/MarketsFirstCarousel';
import { MarketsOverviewCards } from 'client/pages/Markets/components/MarketsOverviewCards/MarketsOverviewCards';
import { MarketsPageHeader } from 'client/pages/Markets/components/MarketsPageHeader';
import { MarketsSecondCarousel } from 'client/pages/Markets/components/MarketsSecondCarousel';
import { MarketsTableTabs } from 'client/pages/Markets/components/MarketTableTabs/MarketsTableTabs';

import 'swiper/css';
import 'swiper/css/pagination';

export function MarketsPage() {
  return (
    <AppPage.Content>
      <MarketsCarouselBanner />
      <MarketsPageHeader />
      <BlitzMarketBoostsDisclosure />
      <div
        // `Swiper` applies a 'z-1' to each carousel item, so we need to
        // 'isolate' here so we don't cover the "Cookie" banner with the carousels
        className="isolate grid grid-cols-1 gap-4 lg:grid-cols-3"
      >
        <MarketsOverviewCards />
        <MarketsFirstCarousel />
        <MarketsSecondCarousel />
      </div>
      <MarketsTableTabs />
    </AppPage.Content>
  );
}
