import { HeaderCard } from 'client/components/HeaderCard';
import { SECTION_IDS } from 'client/consts';
import { InterfaceCard } from 'client/sections/Interface/components/InterfaceCard';
import Image from 'next/image';
import { useRef } from 'react';
import Slider from 'react-slick';
import { INTERFACE_DATA, SLIDER_SETTINGS } from './data';

// Carousel
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// Images
import customize from 'client/sections/Interface/assets/mobile-interface-customize.svg';
import mobile from 'client/sections/Interface/assets/mobile-interface-mobile.svg';
import oneClick from 'client/sections/Interface/assets/mobile-interface-one-click.svg';
import portfolio from 'client/sections/Interface/assets/mobile-interface-portfolio.svg';

export function MobileInterface() {
  const sliderRef = useRef<Slider>(null);
  return (
    <section
      className="flex w-full flex-col items-center gap-y-16 overflow-hidden py-12"
      id={SECTION_IDS.interface}
    >
      <HeaderCard
        title="Interface"
        heading="Trading Experience."
        content="Trade, earn and borrow using your favorite tools on a powerful and intuitive to use app."
        headingClassNames="flex w-full justify-center"
        contentClassNames="flex text-center"
        className="flex w-full items-center px-8"
      />
      <Slider {...SLIDER_SETTINGS} ref={sliderRef} className="w-full">
        <InterfaceCard.Wrapper innerClassName="bg-mobileInterface">
          <InterfaceCard.Content
            {...INTERFACE_DATA.customize}
            className="items-center"
          />
          <Image
            src={customize}
            alt="Customizable Experience"
            className="mx-auto"
            loading="eager"
          />
        </InterfaceCard.Wrapper>
        <InterfaceCard.Wrapper innerClassName="bg-mobileInterface">
          <InterfaceCard.Content {...INTERFACE_DATA.oneClick} />
          <Image
            src={oneClick}
            alt="one-click trading"
            className="mx-auto"
            loading="eager"
          />
        </InterfaceCard.Wrapper>
        <InterfaceCard.Wrapper innerClassName="bg-mobileInterface">
          <InterfaceCard.Content {...INTERFACE_DATA.mobile} />
          <Image
            src={mobile}
            alt="mobile"
            className="mx-auto"
            loading="eager"
          />
        </InterfaceCard.Wrapper>
        <InterfaceCard.Wrapper innerClassName="bg-mobileInterface">
          <InterfaceCard.Content {...INTERFACE_DATA.portfolio} />
          <Image
            src={portfolio}
            alt="portfolio-management"
            className="-mx-10"
            loading="eager"
          />
        </InterfaceCard.Wrapper>
      </Slider>
    </section>
  );
}
