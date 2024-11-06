'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { ProductInfoButton } from 'client/sections/Products/components/ProductInfoButton';
import { SelectedProductCard } from 'client/sections/Products/components/SelectedProductCard';
import { PRODUCT_DATA } from 'client/sections/Products/data';
import { useState } from 'react';

export function DesktopProductCards() {
  const [selectedCard, setSelectedCard] = useState(PRODUCT_DATA[0]);

  return (
    <div className="grid grid-cols-2 gap-x-6">
      <div className="flex flex-col gap-y-6">
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
                <Icon size={18} />
              </div>
              <span>{card.title}</span>
            </ProductInfoButton>
          );
        })}
      </div>
      <div
        className={joinClassNames(
          'flex items-center justify-start',
          'md:pl-4 lg:pl-6 xl:pl-8',
        )}
      >
        <SelectedProductCard
          selectedCard={selectedCard}
          key={selectedCard.title}
        />
      </div>
    </div>
  );
}
