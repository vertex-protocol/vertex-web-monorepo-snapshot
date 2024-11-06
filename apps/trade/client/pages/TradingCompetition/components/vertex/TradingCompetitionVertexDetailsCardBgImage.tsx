import detailsCardBgImageSrc from 'client/pages/TradingCompetition/assets/details-card/details-card-bg-vertex.svg';
import Image from 'next/image';

export function TradingCompetitionVertexDetailsCardBgImage() {
  return (
    <Image
      src={detailsCardBgImageSrc}
      // `-z-10` to prevent interference with hover overlay.
      className="absolute right-0 top-0 -z-10 h-full translate-x-20 object-cover sm:translate-x-0"
      alt=""
    />
  );
}
