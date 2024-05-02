import { Button } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { TutorialFlowProgressBar } from './TutorialFlowProgressBar';

interface Props {
  numberOfCompletedSteps: number;
  setIsExpanded: (expanded: boolean) => void;
}

export function TutorialFlowHeader({
  numberOfCompletedSteps,
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
        numberOfCompletedSteps={numberOfCompletedSteps}
      />
    </div>
  );
}
