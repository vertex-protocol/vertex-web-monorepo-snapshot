import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  LinkButton,
  ScrollShadowsContainer,
  UpDownChevronIcon,
} from '@vertex-protocol/web-ui';
import { SpinnerContainer } from 'client/components/SpinnerContainer';
import { MarketNewsItem } from 'common/types/integrations/MarketNewsItem';
import * as Accordion from '@radix-ui/react-accordion';
import { useState } from 'react';
import Link from 'next/link';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';

interface Props extends WithClassnames {
  items: MarketNewsItem[] | undefined;
  isLoading?: boolean;
}

export function NewsTabItems({ items, isLoading }: Props) {
  const [openAccordionIds, setOpenAccordionIds] = useState<string[]>([]);
  const { trackEvent } = useAnalyticsContext();

  if (isLoading || !items) {
    return <SpinnerContainer />;
  }

  return (
    <ScrollShadowsContainer className="flex flex-col">
      <Accordion.Root
        type="multiple"
        value={openAccordionIds}
        onValueChange={setOpenAccordionIds}
      >
        {items.map(({ url, headline, summary, sourceName }) => {
          const isOpen = openAccordionIds.includes(url);
          return (
            <Accordion.Item
              key={url}
              value={url}
              className={joinClassNames('flex flex-col')}
            >
              <Accordion.Header asChild>
                <Accordion.Trigger
                  className={joinClassNames(
                    'flex cursor-pointer items-center justify-between p-2.5 align-middle text-xs',
                    'hover:text-text-primary focus:text-text-primary data-[state=open]:text-text-primary',
                  )}
                  onClick={() => {
                    trackEvent({
                      type: 'newsfeed_clicked',
                      data: { clickType: 'headline' },
                    });
                  }}
                >
                  <h3 className="truncate">{headline}</h3>
                  <div className="pl-2">
                    <UpDownChevronIcon className="text-sm" open={isOpen} />
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content asChild>
                <div className="flex flex-col items-start gap-y-2.5 px-5 pb-2.5">
                  <p className="text-text-tertiary">
                    <span className="text-text-secondary">AI Summary:</span>{' '}
                    {summary ?? 'Unavailable'}
                  </p>
                  <LinkButton
                    href={url}
                    as={Link}
                    external
                    colorVariant="primary"
                    withExternalIcon
                    onClick={() => {
                      trackEvent({
                        type: 'newsfeed_clicked',
                        data: { clickType: 'link' },
                      });
                    }}
                  >
                    {sourceName ?? 'Full article'}
                  </LinkButton>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </ScrollShadowsContainer>
  );
}
