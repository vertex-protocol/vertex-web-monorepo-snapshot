import bgImage from 'client/pages/TradingCompetition/components/mantle/TradingCompetitionMantlePageBgImage/page-bg.svg';
import Image from 'next/image';

export function TradingCompetitionMantlePageBgImage() {
  return (
    <Image
      src={bgImage}
      className="absolute bottom-0 right-0 -z-10 hidden h-4/5 min-h-[600px] w-auto lg:block"
      alt=""
    />
  );
}
