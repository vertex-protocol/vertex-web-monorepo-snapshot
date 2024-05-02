import * as Accordion from '@radix-ui/react-accordion';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { FaqItem } from '../hooks/useFaqItems';

interface Props {
  item: FaqItem;
  open: boolean;
}

export function FaqAccordionItem({
  className,
  open,
  item,
}: WithClassnames<Props>) {
  const { title, content } = item;

  return (
    <Accordion.Item value={title} asChild>
      <Card
        className={joinClassNames(
          'hover:bg-overlay-hover/5 flex flex-col',
          className,
        )}
      >
        <Accordion.Trigger>
          <Accordion.Header
            className={joinClassNames(
              'flex w-full items-center justify-between gap-x-2.5 p-4 text-left',
              open
                ? 'text-text-primary'
                : 'text-text-secondary hover:text-text-primary',
            )}
          >
            {title}
            <UpDownChevronIcon open={open} size={14} className="shrink-0" />
          </Accordion.Header>
        </Accordion.Trigger>
        <Accordion.Content className="text-text-tertiary overflow-hidden px-4 pb-4 text-sm leading-5">
          {content}
        </Accordion.Content>
      </Card>
    </Accordion.Item>
  );
}
