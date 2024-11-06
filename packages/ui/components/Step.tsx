import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { COMMON_TRANSPARENCY_COLORS } from '../consts';
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
      return 'border-accent/10';
    }
    if (active) {
      return 'border-accent';
    }
    return 'border-stroke';
  })();

  return (
    <div
      className={joinClassNames(
        'flex aspect-square rounded-full p-px',
        COMMON_TRANSPARENCY_COLORS.bgAccent,
        'text-accent border-2',
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
