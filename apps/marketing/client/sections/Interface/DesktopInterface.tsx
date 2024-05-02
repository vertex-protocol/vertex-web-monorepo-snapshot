import classNames from 'classnames';
import { HeaderCard } from 'client/components/HeaderCard';
import {
  DEFAULT_SECTION_GAP,
  DEFAULT_SECTION_PADDING,
  DEFAULT_SECTION_WIDTH,
  SECTION_IDS,
} from 'client/consts';
import { InterfaceCard } from 'client/sections/Interface/components/InterfaceCard';
import Image from 'next/image';
import { INTERFACE_DATA } from './data';

// Images
import customize from 'client/sections/Interface/assets/interface-customize.svg';
import mobile from 'client/sections/Interface/assets/interface-mobile.svg';
import oneClick from 'client/sections/Interface/assets/interface-one-click.svg';
import portfolio from 'client/sections/Interface/assets/interface-portfolio.svg';

export function DesktopInterface() {
  return (
    <section
      className={classNames(
        'flex flex-col',
        DEFAULT_SECTION_PADDING,
        DEFAULT_SECTION_GAP,
        DEFAULT_SECTION_WIDTH,
      )}
      id={SECTION_IDS.interface}
    >
      <HeaderCard
        title="Interface"
        heading="Trading Experience."
        content="Trade, earn and borrow using your favorite tools on a powerful and intuitive to use app."
        headingClassNames="flex w-full justify-center"
        contentClassNames="flex flex-col text-center sm:w-2/3"
        className="flex w-full items-center lg:px-12"
      />
      <div className="grid grid-cols-5 grid-rows-2 gap-6">
        <InterfaceCard.Wrapper
          innerClassName="bg-interface1"
          className="col-span-3"
        >
          <InterfaceCard.Content {...INTERFACE_DATA.customize} />
          <Image
            src={customize}
            alt="Customizable Experience"
            className="mt-4 h-auto w-full"
          />
        </InterfaceCard.Wrapper>
        <InterfaceCard.Wrapper
          innerClassName="bg-interface2 pb-9"
          className="col-span-2"
        >
          <Image
            src={oneClick}
            alt="One-Click Trading"
            className="h-auto w-full"
          />
          <InterfaceCard.Content {...INTERFACE_DATA.oneClick} />
        </InterfaceCard.Wrapper>
        <InterfaceCard.Wrapper
          innerClassName="bg-interface3"
          className="col-span-2"
        >
          <InterfaceCard.Content {...INTERFACE_DATA.mobile} />
          <Image src={mobile} alt="Mobile" className="ml-8 w-1/2 pt-2" />
        </InterfaceCard.Wrapper>
        <InterfaceCard.Wrapper
          innerClassName="bg-interface4"
          className="col-span-3"
        >
          <InterfaceCard.Content {...INTERFACE_DATA.portfolio} />
          <Image
            src={portfolio}
            alt="Portfolio Management"
            className="h-auto w-full scale-110"
          />
        </InterfaceCard.Wrapper>
      </div>
    </section>
  );
}
