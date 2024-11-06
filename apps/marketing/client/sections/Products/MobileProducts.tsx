import { joinClassNames } from '@vertex-protocol/web-common';
import { HeaderCard } from 'client/components/HeaderCard';
import { SECTION_IDS } from 'client/consts';
import { MobileProductCards } from 'client/sections/Products/components/MobileProductCards';

export function MobileProducts() {
  return (
    <section
      className={joinClassNames(
        'flex max-h-[56rem] min-h-[56rem] w-full scroll-m-16 flex-col px-6',
        'sm:px-12 sm:pt-20',
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
        className="items-center py-12 text-center"
      />
      <MobileProductCards />
    </section>
  );
}
