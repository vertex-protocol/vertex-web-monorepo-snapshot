import { joinClassNames } from '@vertex-protocol/web-common';
import { range } from 'lodash';

export function TutorialFlowProgressBar({
  numTotalSteps,
  numCompletedSteps,
}: {
  numTotalSteps: number;
  numCompletedSteps: number;
}) {
  return (
    <div className="flex gap-x-1">
      {/*Connect wallet is always completed*/}
      <ProgressBarSegment isCompleted />
      {range(numTotalSteps).map((index) => {
        const isCompleted = index < numCompletedSteps;
        return <ProgressBarSegment key={index} isCompleted={isCompleted} />;
      })}
    </div>
  );
}

function ProgressBarSegment({ isCompleted }: { isCompleted: boolean }) {
  return (
    <div
      className={joinClassNames(
        'h-2 flex-1 first:rounded-l-md last:rounded-r-md',
        isCompleted ? 'bg-accent' : 'bg-overlay-accent',
      )}
    />
  );
}
