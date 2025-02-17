import * as Collapsible from '@radix-ui/react-collapsible';
import { Button, UpDownChevronIcon } from '@vertex-protocol/web-ui';
import { ReactNode, useState } from 'react';

interface Props {
  title: string;
  collapsibleContent: ReactNode;
  isInitialOpen?: boolean;
}

export function CollapsibleInfoCard({
  title,
  collapsibleContent,
  isInitialOpen = false,
}: Props) {
  const [open, setOpen] = useState(isInitialOpen);

  return (
    <Collapsible.Root
      className="bg-surface-1 flex flex-col gap-y-4 rounded-md px-3 py-2.5 text-sm"
      open={open}
      onOpenChange={setOpen}
    >
      <Collapsible.Trigger asChild>
        <Button className="group justify-between">
          <span className="text-text-primary">{title}</span>
          <UpDownChevronIcon
            open={open}
            size={20}
            className="text-text-secondary group-hover:text-text-primary transition-colors"
          />
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content className="text-text-secondary text-xs">
        {collapsibleContent}
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
