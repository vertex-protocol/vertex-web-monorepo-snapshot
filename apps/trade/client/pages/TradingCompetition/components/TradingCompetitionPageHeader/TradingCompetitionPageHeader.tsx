import { NextImageSrc } from '@vertex-protocol/web-common';
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
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="flex flex-col gap-y-2">
        <div className="flex max-w-[525px] flex-col gap-y-1">
          {title && (
            <h1 className="text-text-primary title-text text-xl lg:text-3xl">
              {title}
            </h1>
          )}
          {imageSrc && <Image src={imageSrc} alt={imageAlt ?? ''} />}
        </div>
        <TradingCompetitionSubheader />
      </div>
      <TradingCompetitionCountdownHeader />
    </div>
  );
}
