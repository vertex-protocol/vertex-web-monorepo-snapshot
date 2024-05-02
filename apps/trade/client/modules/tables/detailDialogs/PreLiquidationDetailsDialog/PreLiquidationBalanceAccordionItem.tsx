import * as Accordion from '@radix-ui/react-accordion';
import { joinClassNames, NextImageSrc } from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import Image from 'next/image';
import { ReactNode } from 'react';

interface Props {
  value: string;
  active: boolean;
  productIconSrc: NextImageSrc;
  productName: string;
  sideLabel: string;
  isPositiveBalance: boolean;
  metrics: ReactNode;
}

export function PreLiquidationBalanceAccordionItem({
  active,
  metrics,
  productIconSrc,
  productName,
  sideLabel,
  isPositiveBalance,
  value,
}: Props) {
  return (
    <Accordion.Item value={value}>
      <Card className="text-text-secondary bg-surface-1 flex flex-col">
        <Accordion.Trigger className="flex items-center gap-x-1.5 p-2">
          <Image
            src={productIconSrc}
            alt={productName}
            className="h-auto w-5"
          />
          {productName}
          <div className="flex-1" />
          <span
            className={joinClassNames(
              'text-2xs',
              isPositiveBalance ? 'text-positive' : 'text-negative',
            )}
          >
            {sideLabel}
          </span>
          <UpDownChevronIcon open={active} size={16} />
        </Accordion.Trigger>
        <Accordion.Content className="p-2 pt-0">{metrics}</Accordion.Content>
      </Card>
    </Accordion.Item>
  );
}
