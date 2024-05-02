import { clientEnv } from 'common/environment/clientEnv';
import Image from 'next/image';
import blitzDesktopHighlightsImage from '../assets/blitz-desktop-highlights.svg';
import blitzMobileHighlightsImage from '../assets/blitz-mobile-highlights.svg';
import vertexDesktopHighlightsImage from '../assets/vertex-desktop-highlights.svg';
import vertexMobileHighlightsImage from '../assets/vertex-mobile-highlights.svg';

const BG_HIGHLIGHT_IMAGES = {
  vertex: {
    mobile: vertexMobileHighlightsImage,
    desktop: vertexDesktopHighlightsImage,
  },
  blitz: {
    mobile: blitzMobileHighlightsImage,
    desktop: blitzDesktopHighlightsImage,
  },
}[clientEnv.base.brandName];

export function AppBackgroundHighlights() {
  return (
    <>
      <Image
        className="-z-10 object-cover lg:hidden"
        src={BG_HIGHLIGHT_IMAGES.mobile}
        fill
        priority
        alt="Background Image"
      />
      <Image
        className="-z-10 hidden object-cover lg:block"
        src={BG_HIGHLIGHT_IMAGES.desktop}
        fill
        priority
        alt="Background Image"
      />
    </>
  );
}
