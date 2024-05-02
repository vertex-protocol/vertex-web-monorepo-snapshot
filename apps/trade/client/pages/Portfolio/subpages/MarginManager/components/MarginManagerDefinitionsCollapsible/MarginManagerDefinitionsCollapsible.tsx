import * as Collapsible from '@radix-ui/react-collapsible';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Button, Card } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { useState } from 'react';
import { MarginManagerDefinitionsTabs } from './MarginManagerDefinitionsTabs';

function CollapsibleTrigger({ isExpanded }: { isExpanded: boolean }) {
  return (
    <Collapsible.Trigger asChild>
      <Button
        className={joinClassNames(
          'flex items-center justify-between',
          'px-3 py-4',
          'text-accent text-left text-xs font-medium sm:text-sm',
        )}
      >
        How to use the Margin Manager
        <UpDownChevronIcon open={isExpanded} className="text-sm sm:text-base" />
      </Button>
    </Collapsible.Trigger>
  );
}

export function MarginManagerDefinitionsCollapsible() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible.Root asChild open={isExpanded} onOpenChange={setIsExpanded}>
      <Card className="bg-overlay-accent/10 flex flex-col">
        <CollapsibleTrigger isExpanded={isExpanded} />
        <Collapsible.Content>
          <MarginManagerDefinitionsTabs />
        </Collapsible.Content>
      </Card>
    </Collapsible.Root>
  );
}
