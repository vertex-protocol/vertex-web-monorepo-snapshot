import { HeaderCard } from 'client/components/HeaderCard';
import { SECTION_IDS } from 'client/consts';
import { useState } from 'react';
import { ExpandableProductCard } from './components/ExpandableProductCard';
import { PRODUCT_DATA } from './data';
import { joinClassNames } from '@vertex-protocol/web-common';

export function MobileProducts() {
  const [selectedCard, setSelectedCard] = useState(PRODUCT_DATA[0]);

  return (
    <section
      className={joinClassNames(
        'flex max-h-[56rem] min-h-[56rem] w-full -scroll-m-8 flex-col px-6',
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
        className="items-center pb-12 pt-24 text-center"
      />
      <div className="flex w-full flex-col gap-y-6">
        {PRODUCT_DATA.map((data) => {
          return (
            <ExpandableProductCard
              key={data.title}
              onClick={() => setSelectedCard(data)}
              className={joinClassNames(
                'duration-200',
                selectedCard === data ? 'max-h-96' : 'max-h-20',
              )}
              isSelectedCard={selectedCard === data}
              data={data}
            />
          );
        })}
      </div>
    </section>
  );
}
