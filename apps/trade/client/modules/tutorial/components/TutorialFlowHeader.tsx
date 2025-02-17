import { Button, UpDownChevronIcon } from '@vertex-protocol/web-ui';
import { TutorialFlowProgressBar } from 'client/modules/tutorial/components/TutorialFlowProgressBar';

interface Props {
  numTotalSteps: number;
  numCompletedSteps: number;
  setIsExpanded: (expanded: boolean) => void;
}

export function TutorialFlowHeader({
  numTotalSteps,
  numCompletedSteps,
  setIsExpanded,
}: Props) {
  return (
    <div className="flex flex-col gap-y-3.5 p-2">
      <Button
        className="text-text-primary flex items-center justify-between"
        onClick={() => setIsExpanded(false)}
      >
        Get started
        <UpDownChevronIcon open={false} />
      </Button>
      <TutorialFlowProgressBar
        numCompletedSteps={numCompletedSteps}
        numTotalSteps={numTotalSteps}
      />
    </div>
  );
}
