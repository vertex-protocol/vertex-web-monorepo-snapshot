import detailsCardBgBottomSrc from 'client/pages/TradingCompetition/assets/details-card/blitz/details-card-bg-bottom.svg';
import detailsCardBgTopSrc from 'client/pages/TradingCompetition/assets/details-card/blitz/details-card-bg-top.svg';
import Image from 'next/image';

export function TradingCompetitionBlitzDetailsCardBgImage() {
  return (
    <>
      <Image
        src={detailsCardBgTopSrc}
        // `-z-10` on all these to prevent interference with hover overlay.
        className="absolute left-0 top-0 -z-10 object-cover"
        alt=""
      />
      <Image
        src={detailsCardBgTopSrc}
        className="absolute right-0 top-0 -z-10 -scale-x-100 object-cover"
        alt=""
      />
      <Image
        src={detailsCardBgBottomSrc}
        className="absolute bottom-14 left-0 -z-10 object-cover"
        alt=""
      />
      <Image
        src={detailsCardBgBottomSrc}
        className="absolute bottom-14 right-0 -z-10 -scale-x-100 object-cover"
        alt=""
      />
    </>
  );
}
