import * as Accordion from '@radix-ui/react-accordion';
import { GetIndexerBlitzInitialDropConditionsResponse } from '@vertex-protocol/client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ClaimStepAccordionItem } from 'client/pages/BlitzPoints/components/ClaimInitialPointsCollapsible/ClaimStepAccordionItem';
import { ReactNode, useState } from 'react';
import { ConditionalKeys } from 'type-fest';

interface Props extends WithClassnames {
  initialDropConditionsResponse:
    | GetIndexerBlitzInitialDropConditionsResponse
    | undefined;
}

interface ClaimStep {
  id: string;
  title: string;
  description: ReactNode;
  hasCompletedDataKey: ConditionalKeys<
    GetIndexerBlitzInitialDropConditionsResponse,
    boolean
  >;
}

const CLAIM_STEPS: ClaimStep[] = [
  {
    id: 'accountValue',
    title: `Have a min account value of $100`,
    description: (
      <div className="flex flex-col gap-y-1">
        <p>
          Reach an account value greater than $100 by depositing USDB or wETH.
        </p>
        <p className="text-xs">
          Note: Deposits made prior to March 12, 2024 do not count towards this
          requirement. You will need to withdraw and redeposit to meet this
          requirement.
        </p>
      </div>
    ),
    hasCompletedDataKey: 'accountValueReached',
  },
  {
    id: 'perpTrade',
    title: 'Place 2 perp trades',
    description: 'Successfully place 2 perp trades in any market.',
    hasCompletedDataKey: 'perpTradesCompleted',
  },
];

export function ClaimStepsAccordion({
  className,
  initialDropConditionsResponse,
}: Props) {
  const [activeAccordionId, setActiveAccordionId] = useState<string>();

  return (
    <Accordion.Root
      value={activeAccordionId}
      onValueChange={setActiveAccordionId}
      type="single"
      collapsible
      className={joinClassNames('flex flex-col gap-y-2', className)}
    >
      {CLAIM_STEPS.map((step) => {
        return (
          <ClaimStepAccordionItem
            key={step.id}
            id={step.id}
            isCompleted={
              !!initialDropConditionsResponse?.[step.hasCompletedDataKey]
            }
            title={step.title}
            open={activeAccordionId === step.id}
            description={step.description}
          />
        );
      })}
    </Accordion.Root>
  );
}
