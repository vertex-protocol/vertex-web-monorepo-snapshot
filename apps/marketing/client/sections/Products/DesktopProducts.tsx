import { HeaderCard } from 'client/components/HeaderCard';
import {
  DEFAULT_SECTION_GAP,
  DEFAULT_SECTION_PADDING,
  DEFAULT_SECTION_WIDTH,
  SECTION_IDS,
} from 'client/consts';
import { useState } from 'react';
import { ProductInfoButton } from './components/ProductInfoButton';
import { SelectedProductCard } from './components/SelectedProductCard';
import { PRODUCT_DATA } from './data';
import { joinClassNames } from '@vertex-protocol/web-common';

export function DesktopProducts() {
  const [selectedCard, setSelectedCard] = useState(PRODUCT_DATA[0]);

  return (
    <section
      className={joinClassNames(
        DEFAULT_SECTION_PADDING,
        DEFAULT_SECTION_GAP,
        DEFAULT_SECTION_WIDTH,
        'flex -scroll-m-20 flex-col',
        'lg:py-48 lg:pb-24',
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
      <div className="flex w-full gap-x-16">
        <div className="flex h-full flex-1 items-center justify-end">
          <div className="flex w-full flex-col gap-y-6">
            {PRODUCT_DATA.map((card) => {
              const Icon = card.icon;
              return (
                <ProductInfoButton
                  variant={card.variant}
                  onClick={() => setSelectedCard(card)}
                  isSelected={selectedCard === card}
                  key={card.title}
                >
                  <div className="bg-white-400 text-white-700 rounded-md p-2.5">
                    <Icon size={20} />
                  </div>
                  <span>{card.title}</span>
                </ProductInfoButton>
              );
            })}
          </div>
        </div>
        <div
          className={joinClassNames(
            'flex flex-1 items-center justify-start',
            'md:pl-4 lg:pl-6 xl:pl-8',
          )}
        >
          <SelectedProductCard
            selectedCard={selectedCard}
            key={selectedCard.title}
          />
        </div>
      </div>
    </section>
  );
}
