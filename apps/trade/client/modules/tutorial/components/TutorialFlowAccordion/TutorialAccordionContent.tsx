import * as Accordion from '@radix-ui/react-accordion';
import { Button, SecondaryButton } from '@vertex-protocol/web-ui';

interface Props {
  description: string;
  actionLabel: string;
  onActionClick: () => void;
  onSkipClick: () => void;
}

export function TutorialAccordionContent({
  description,
  actionLabel,
  onActionClick,
  onSkipClick,
}: Props) {
  return (
    <Accordion.Content
      // Left padding to align the description with the label
      className="flex flex-col gap-y-3 pl-8"
    >
      <p className="text-text-tertiary text-xs">{description}</p>
      <div className="flex gap-x-2">
        <SecondaryButton size="md" onClick={onActionClick}>
          {actionLabel}
        </SecondaryButton>
        <Button
          className="text-text-secondary hover:text-text-primary text-xs"
          onClick={onSkipClick}
        >
          Skip
        </Button>
      </div>
    </Accordion.Content>
  );
}
