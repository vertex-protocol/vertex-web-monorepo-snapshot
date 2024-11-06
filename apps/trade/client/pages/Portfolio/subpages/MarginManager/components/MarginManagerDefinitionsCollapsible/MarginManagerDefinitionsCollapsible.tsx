'use client';

import * as Collapsible from '@radix-ui/react-collapsible';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Button,
  Card,
  COMMON_TRANSPARENCY_COLORS,
  UpDownChevronIcon,
} from '@vertex-protocol/web-ui';
import { MarginManagerDefinitionsTabs } from 'client/pages/Portfolio/subpages/MarginManager/components/MarginManagerDefinitionsCollapsible/MarginManagerDefinitionsTabs';
import { useState } from 'react';

function CollapsibleTrigger({ isExpanded }: { isExpanded: boolean }) {
  return (
    <Collapsible.Trigger asChild>
      <Button
        className={joinClassNames(
          'flex items-center justify-between',
          'px-3 py-4',
          'text-accent text-left text-xs sm:text-sm',
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
      <Card
        className={joinClassNames(
          'flex flex-col',
          COMMON_TRANSPARENCY_COLORS.bgAccent,
        )}
      >
        <CollapsibleTrigger isExpanded={isExpanded} />
        <Collapsible.Content>
          <MarginManagerDefinitionsTabs />
        </Collapsible.Content>
      </Card>
    </Collapsible.Root>
  );
}
