'use client';

import {
  TabsContent,
  TabsList,
  Root as TabsRoot,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { ColorBorderButton } from 'client/components/Button/ColorBorderButton';
import { useState } from 'react';
import { PRODUCT_DATA, ProductData } from 'client/sections/Products/data';

export function MobileProductCards() {
  const [selectedCard, setSelectedCard] = useState(PRODUCT_DATA[0]);

  return (
    <div className="flex flex-col gap-y-6">
      {PRODUCT_DATA.map((data) => (
        <MobileProductCard
          key={data.title}
          data={data}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      ))}
    </div>
  );
}

interface Props extends WithClassnames {
  data: ProductData;
  selectedCard: ProductData;
  setSelectedCard: (data: ProductData) => void;
}

function MobileProductCard({ data, selectedCard, setSelectedCard }: Props) {
  const { variant, icon: Icon, title, subTabs } = data;

  const [subTabId, setSubTabId] = useState(subTabs[0].id);

  const isSelectedCard = selectedCard === data;

  const backgroundColorClassName = {
    pink: 'bg-pinkGradient',
    purple: 'bg-purpleGradient',
  }[variant];

  return (
    <div
      className={joinClassNames(
        'flex w-full overflow-hidden rounded-xl backdrop-blur-xl',
        'border-white-600 border text-3xl font-bold text-white duration-200',
        isSelectedCard
          ? [backgroundColorClassName, 'max-h-96']
          : 'bg-grayGradient max-h-20',
      )}
      onClick={() => setSelectedCard(data)}
    >
      <div
        className={joinClassNames(
          'h-full w-full flex-col justify-start gap-y-4 overflow-hidden',
          'bg-black-700 rounded-xl font-bold text-white backdrop-blur-xl',
        )}
      >
        <div className="xs:text-3xl flex items-center gap-x-3.5 p-5 text-xl leading-7">
          <div className="bg-white-400 text-white-700 rounded-md p-2.5">
            <Icon size={20} />
          </div>
          <span>{title}</span>
        </div>
        <TabsRoot
          value={subTabId}
          onValueChange={setSubTabId}
          className="font-dmSans flex flex-col gap-y-3 p-6 pt-2 font-normal"
        >
          <TabsList className="flex gap-x-2 text-xs">
            {subTabs.map(({ id }) => (
              <TabsTrigger key={id} value={id}>
                <ColorBorderButton
                  as="div"
                  className={joinClassNames(
                    'mask-round overflow-hidden rounded-full px-4 py-1 text-sm capitalize text-white',
                    subTabId === id ? 'opacity-100' : 'opacity-50',
                  )}
                  borderRadiusFull
                >
                  {id}
                </ColorBorderButton>
              </TabsTrigger>
            ))}
          </TabsList>
          {subTabs.map(({ content, id }) => (
            <TabsContent
              key={id}
              value={id}
              className={joinClassNames(
                'text-white-700 whitespace-pre-wrap py-2',
                'text-left text-base',
                'md:text-lg',
              )}
            >
              {content}
            </TabsContent>
          ))}
        </TabsRoot>
      </div>
    </div>
  );
}
