import { joinClassNames } from '@vertex-protocol/web-common';
import {
  ACTION_TOAST_ICON_FILL_BY_VARIANT,
  ACTION_TOAST_ICONS_BY_VARIANT,
  ACTION_TOAST_LEFT_SECTION_WIDTH,
} from 'client/components/Toast/ActionToast/consts';
import {
  ActionToastBodyProps,
  ActionToastHeaderProps,
  ActionToastSectionedBodyProps,
  ActionToastSeparatorProps,
  SectionedHeaderProps,
} from 'client/components/Toast/ActionToast/types';
import { TOAST_HEADER_ICON_SIZE } from 'client/components/Toast/consts';
import { Toast } from 'client/components/Toast/Toast';

function TextHeader({
  className,
  children,
  variant,
  icon,
  onDismiss,
}: ActionToastHeaderProps) {
  const Icon = icon ?? ACTION_TOAST_ICONS_BY_VARIANT[variant];

  return (
    <Toast.Header
      onDismiss={onDismiss}
      className={joinClassNames('flex items-center gap-x-2', className)}
    >
      <Icon
        fill={ACTION_TOAST_ICON_FILL_BY_VARIANT[variant]}
        size={TOAST_HEADER_ICON_SIZE}
      />
      {children}
    </Toast.Header>
  );
}

function SectionedHeader({
  className,
  variant,
  icon,
  leftLabel,
  rightLabel,
  onDismiss,
}: SectionedHeaderProps) {
  const Icon = icon ?? ACTION_TOAST_ICONS_BY_VARIANT[variant];

  return (
    <Toast.Header
      onDismiss={onDismiss}
      className={joinClassNames('divide-overlay-divider divide-x', className)}
    >
      <div className={ACTION_TOAST_LEFT_SECTION_WIDTH}>{leftLabel}</div>
      <div className="flex items-center gap-x-2 px-2.5">
        <span>{rightLabel}</span>
        <Icon
          fill={ACTION_TOAST_ICON_FILL_BY_VARIANT[variant]}
          size={TOAST_HEADER_ICON_SIZE}
        />
      </div>
    </Toast.Header>
  );
}

function Separator({ variant, ttl }: ActionToastSeparatorProps) {
  const dividerColor = {
    success: 'bg-positive/50',
    failure: 'bg-negative/50',
    pending: 'bg-accent/50',
  }[variant];

  return (
    <Toast.Separator
      className={joinClassNames(
        variant === 'pending' && 'animate-pulse',
        dividerColor,
      )}
      ttl={ttl}
    />
  );
}

function Body({ variant, className, children }: ActionToastBodyProps) {
  return (
    <Toast.Body
      className={joinClassNames(
        variant === 'failure' && 'text-negative overflow-y-auto break-all',
        className,
      )}
    >
      {children}
    </Toast.Body>
  );
}

function SectionedBody({
  leftSection,
  rightSection,
  className,
}: ActionToastSectionedBodyProps) {
  return (
    <Toast.Body
      className={joinClassNames(
        'divide-overlay-divider flex divide-x',
        className,
      )}
    >
      <div
        className={joinClassNames(
          'flex flex-col py-2',
          ACTION_TOAST_LEFT_SECTION_WIDTH,
        )}
      >
        {leftSection}
      </div>
      <div className="flex min-w-max flex-1 flex-col gap-y-2 py-2 pl-2">
        {rightSection}
      </div>
    </Toast.Body>
  );
}

export const ActionToast = {
  Container: Toast.Container,
  TextHeader,
  SectionedHeader,
  Separator,
  Body,
  SectionedBody,
};
