import { joinClassNames } from '@vertex-protocol/web-common';
import { range } from 'lodash';
import { TUTORIAL_FLOW_ACCORDION_ITEMS } from './TutorialFlowAccordion/tutorialFlowAccordionItems';

export function TutorialFlowProgressBar({
  numberOfCompletedSteps,
}: {
  numberOfCompletedSteps: number;
}) {
  // +1: Range is over length + 1 to include "Connect Wallet", which is assumed to be completed
  return (
    <div className="flex gap-x-1">
      {range(TUTORIAL_FLOW_ACCORDION_ITEMS.length + 1).map((_, index) => {
        const isCompleted = index < numberOfCompletedSteps + 1;
        return (
          <div
            key={index}
            className={joinClassNames(
              'h-2 flex-1 first:rounded-l-md last:rounded-r-md',
              isCompleted ? 'bg-accent' : 'bg-overlay-accent/10',
            )}
          />
        );
      })}
    </div>
  );
}
