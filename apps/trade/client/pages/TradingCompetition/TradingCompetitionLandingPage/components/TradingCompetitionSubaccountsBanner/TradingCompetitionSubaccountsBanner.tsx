import { NewPill } from 'client/components/NewPill';
import bgImageSrcBlitz from 'client/pages/TradingCompetition/assets/subaccounts-banner/subaccounts-banner-bg-blitz.png';
import bgImageSrcVertex from 'client/pages/TradingCompetition/assets/subaccounts-banner/subaccounts-banner-bg-vertex.png';
import { TradingCompetitionSubaccountsBannerCTA } from 'client/pages/TradingCompetition/TradingCompetitionLandingPage/components/TradingCompetitionSubaccountsBanner/TradingCompetitionSubaccountsBannerCTA';
import { clientEnv } from 'common/environment/clientEnv';
import Image from 'next/image';

export function TradingCompetitionSubaccountsBanner() {
  const bannerBgImageSrc = {
    vertex: bgImageSrcVertex,
    blitz: bgImageSrcBlitz,
  }[clientEnv.base.brandName];

  return (
    <div className="border-stroke bg-background relative overflow-hidden rounded-lg border-4">
      <div className="flex flex-col items-start gap-y-3 p-6 lg:w-1/2">
        <NewPill />
        <span className="text-text-primary text-lg sm:text-xl">
          Competition Accounts
        </span>
        <p className="text-text-tertiary text-xs sm:text-sm">
          You can now create a dedicated account for competitions that won’t
          impact your main account.
        </p>
        <TradingCompetitionSubaccountsBannerCTA />
      </div>
      <Image
        src={bannerBgImageSrc}
        className="absolute -right-40 -top-20 hidden w-[700px] lg:block"
        alt=""
      />
    </div>
  );
}
