import { joinClassNames } from '@vertex-protocol/web-common';
import { HeaderCard } from 'client/components/HeaderCard';
import {
  DEFAULT_SECTION_GAP,
  DEFAULT_SECTION_PADDING,
  DEFAULT_SECTION_WIDTH,
  SECTION_IDS,
} from 'client/consts';
import { DesktopProductCards } from 'client/sections/Products/components/DesktopProductCards';

export function DesktopProducts() {
  return (
    <section
      className={joinClassNames(
        DEFAULT_SECTION_PADDING,
        DEFAULT_SECTION_GAP,
        DEFAULT_SECTION_WIDTH,
        'flex scroll-m-16 flex-col',
        'lg:py-24',
      )}
      id={SECTION_IDS.products}
    >
      <HeaderCard
        title="products"
        heading={
          <>
            <p>One DEX.</p>
            <p>Everything you need.</p>
          </>
        }
        className="items-center text-center"
      />
      <DesktopProductCards />
    </section>
  );
}
