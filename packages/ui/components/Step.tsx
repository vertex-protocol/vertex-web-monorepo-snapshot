import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Icons } from './Icons';

interface StepLabelProps extends WithClassnames, WithChildren {
  isCompleted: boolean;
  // If provided, renders a more distinct text color
  active?: boolean;
}

function StepLabel({
  isCompleted,
  children,
  className,
  active,
}: StepLabelProps) {
  const textClassNames = (() => {
    if (isCompleted) {
      return 'text-text-tertiary line-through';
    }
    return active ? 'text-text-primary' : 'text-text-secondary';
  })();

  return (
    <span className={joinClassNames(textClassNames, className)}>
      {children}
    </span>
  );
}

interface StepCheckmarkIndicatorProps extends WithClassnames {
  active?: boolean;
  isCompleted?: boolean;
  size?: number;
}

function StepCheckmarkIndicator({
  isCompleted,
  className,
  active,
  size,
}: WithClassnames<StepCheckmarkIndicatorProps>) {
  const stateClassNames = (() => {
    if (isCompleted) {
      return 'border-overlay-accent';
    }
    if (active) {
      return 'border-primary';
    }
    return 'border-stroke';
  })();

  return (
    <div
      className={joinClassNames(
        'flex aspect-square rounded-full p-px',
        'text-accent bg-overlay-accent border-2',
        stateClassNames,
        className,
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      {isCompleted && <Icons.Check className="h-full w-full" />}
    </div>
  );
}

export const Step = {
  Label: StepLabel,
  CheckmarkIndicator: StepCheckmarkIndicator,
};
