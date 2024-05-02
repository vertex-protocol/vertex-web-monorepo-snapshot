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
      return 'ring-accent/10';
    }
    if (active) {
      return 'ring-accent';
    }
    return 'ring-stroke';
  })();

  return (
    <div
      className={joinClassNames(
        'bg-overlay-accent/20 flex aspect-square rounded-full p-0.5',
        'text-accent ring-2 ring-inset',
        stateClassNames,
        className,
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      {isCompleted && <Icons.MdCheck className="h-full w-full" />}
    </div>
  );
}

export const Step = {
  Label: StepLabel,
  CheckmarkIndicator: StepCheckmarkIndicator,
};
