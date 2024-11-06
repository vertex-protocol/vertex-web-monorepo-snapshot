import * as Accordion from '@radix-ui/react-accordion';
import { Button, Step, UpDownChevronIcon } from '@vertex-protocol/web-ui';

interface Props {
  open: boolean;
  triggerLabel: string;
  isCompleted: boolean;
}

export function TutorialAccordionTrigger({
  open,
  triggerLabel,
  isCompleted,
}: Props) {
  return (
    <Accordion.Header asChild>
      <Accordion.Trigger asChild>
        <Button
          className="flex w-full items-center py-2"
          endIcon={<UpDownChevronIcon open={open} />}
        >
          <Step.CheckmarkIndicator
            isCompleted={isCompleted}
            size={24}
            active={open}
          />
          <Step.Label isCompleted={isCompleted} active={open}>
            {triggerLabel}
          </Step.Label>
          {/*Pushes chevron to the right*/}
          <div className="flex-1" />
        </Button>
      </Accordion.Trigger>
    </Accordion.Header>
  );
}
