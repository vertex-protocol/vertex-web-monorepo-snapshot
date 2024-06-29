import { NextImageSrc } from '@vertex-protocol/web-common';
import { AppPage } from 'client/modules/app/AppPage';
import { TradingCompetitionCountdownHeader } from 'client/pages/TradingCompetition/components/TradingCompetitionPageHeader/TradingCompetitionCountdownHeader';
import { TradingCompetitionSubheader } from 'client/pages/TradingCompetition/components/TradingCompetitionPageHeader/TradingCompetitionSubheader';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import Image from 'next/image';

export function TradingCompetitionPageHeader() {
  const {
    config: { brandLogos, routeName },
  } = useTradingCompetitionContext();

  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-1">
          {brandLogos.map((brandLogo, i) => (
            <LogoBox key={i} logo={brandLogo} />
          ))}
        </div>
        <AppPage.Header className="max-w-[525px]" title={routeName} />
        <TradingCompetitionSubheader />
      </div>
      <TradingCompetitionCountdownHeader />
    </div>
  );
}

function LogoBox({ logo }: { logo: NextImageSrc }) {
  return (
    <div className="bg-surface-1 rounded p-1.5">
      <Image src={logo} className="h-4 w-auto" alt="" />
    </div>
  );
}
