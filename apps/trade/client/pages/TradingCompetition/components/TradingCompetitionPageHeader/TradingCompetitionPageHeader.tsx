import { NextImageSrc } from '@vertex-protocol/web-common';
import { AppPage } from 'client/modules/app/AppPage';
import { TradingCompetitionCountdownHeader } from 'client/pages/TradingCompetition/components/TradingCompetitionPageHeader/TradingCompetitionCountdownHeader';
import { TradingCompetitionSubheader } from 'client/pages/TradingCompetition/components/TradingCompetitionPageHeader/TradingCompetitionSubheader';
import Image from 'next/image';

interface Props {
  title?: string;
  imageSrc?: NextImageSrc;
  imageAlt?: string;
}

export function TradingCompetitionPageHeader({
  title,
  imageSrc,
  imageAlt,
}: Props) {
  const titleContent = (
    <>
      {title}
      {imageSrc && <Image src={imageSrc} alt={imageAlt ?? ''} />}
    </>
  );

  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <AppPage.Header
        title={titleContent}
        description={<TradingCompetitionSubheader />}
      />
      <TradingCompetitionCountdownHeader />
    </div>
  );
}
