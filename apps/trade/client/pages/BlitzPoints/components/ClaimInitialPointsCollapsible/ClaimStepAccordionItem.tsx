import * as Accordion from '@radix-ui/react-accordion';
import { WithClassnames } from '@vertex-protocol/web-common';
import { Button, Step } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { ReactNode } from 'react';

interface ClaimStepAccordionItemProps extends WithClassnames {
  id: string;
  isCompleted: boolean;
  title: string;
  open: boolean;
  description: ReactNode;
}

export function ClaimStepAccordionItem({
  id,
  isCompleted,
  title,
  open,
  description,
  className,
}: ClaimStepAccordionItemProps) {
  return (
    <Accordion.Item value={id} className={className}>
      {/*Trigger*/}
      <Accordion.Header asChild>
        <Accordion.Trigger asChild>
          <Button
            className="flex w-full gap-x-2 py-2"
            endIcon={<UpDownChevronIcon open={open} size={16} />}
          >
            <Step.CheckmarkIndicator isCompleted={isCompleted} size={24} />
            <Step.Label
              isCompleted={isCompleted}
              active={open}
              className="whitespace-normal text-left text-base sm:text-lg"
            >
              {title}
            </Step.Label>
            {/*Pushes chevron to the right*/}
            <div className="flex-1" />
          </Button>
        </Accordion.Trigger>
      </Accordion.Header>
      {/*Content, left padding to adjust for checkmark indicator = checkmark size + gap*/}
      <Accordion.Content className="text-text-tertiary pl-8 text-xs sm:text-sm">
        {description}
      </Accordion.Content>
    </Accordion.Item>
  );
}
