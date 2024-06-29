import {
  Root as TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@radix-ui/react-tabs';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { ColorBorderButton } from 'client/components/Button/ColorBorderButton';
import { useState } from 'react';
import { ProductData } from '../data';

interface Props extends WithClassnames {
  selectedCard: ProductData;
}

export function SelectedProductCard({
  className,
  selectedCard: { subTabs, icon: Icon, title, variant },
}: Props) {
  const [subTabId, setSubTabId] = useState(subTabs[0].id);
  const backgroundColorMapping = {
    pink: 'bg-pinkGradient',
    purple: 'bg-purpleGradient',
  }[variant];

  return (
    <div
      className={joinClassNames(
        'flex h-full w-full flex-col justify-start',
        'gap-y-4 overflow-hidden rounded-xl backdrop-blur-xl',
        'px-8 py-6 text-2xl font-bold text-white',
        backgroundColorMapping,
        className,
      )}
    >
      <div className="flex items-center gap-x-5 leading-8">
        <div className="bg-white-400 text-white-700 rounded-md p-3">
          <Icon size={24} />
        </div>
        <span className="text-lg md:text-2xl lg:text-3xl">{title}</span>
      </div>
      <TabsRoot value={subTabId} onValueChange={setSubTabId}>
        <TabsList className="flex gap-x-2 py-3 text-xs">
          {subTabs.map(({ id }) => (
            <TabsTrigger value={id} key={id}>
              <ColorBorderButton
                as="div"
                className={joinClassNames(
                  'mask-round overflow-hidden rounded-full px-4 py-1.5 capitalize',
                  'font-dmSans text-base font-normal text-white duration-100',
                  id === subTabId ? 'opacity-100' : 'opacity-50',
                )}
                key={id}
                borderRadiusFull
              >
                {id}
              </ColorBorderButton>
            </TabsTrigger>
          ))}
        </TabsList>
        {subTabs.map(({ content, id }) => {
          return (
            <TabsContent
              key={id}
              value={id}
              className={joinClassNames(
                'font-dmSans text-white-700 text-base font-normal',
                'md:text-lg',
                'lg:text-xl',
              )}
            >
              {content}
            </TabsContent>
          );
        })}
      </TabsRoot>
    </div>
  );
}
