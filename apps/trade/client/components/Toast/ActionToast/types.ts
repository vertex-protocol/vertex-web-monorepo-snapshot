import { WithClassnames } from '@vertex-protocol/web-common';
import {
  ToastBodyProps,
  ToastHeaderProps,
  ToastProps,
  ToastSeparatorProps,
} from 'client/components/Toast/types';
import { ElementType, ReactNode } from 'react';

type ActionToastVariant = 'success' | 'failure' | 'pending';

export interface ActionToastHeaderProps extends ToastHeaderProps {
  variant: ActionToastVariant;
  icon?: ElementType<{
    fill: string;
    size: number;
  }>;
}

export interface SectionedHeaderProps extends ActionToastHeaderProps {
  leftLabel: string;
  rightLabel: string;
}

export interface ActionToastSeparatorProps extends ToastSeparatorProps {
  variant: ActionToastVariant;
}

export interface ActionToastBodyProps extends ToastBodyProps {
  variant: ActionToastVariant;
}

export interface ActionToastSectionedBodyProps extends WithClassnames {
  leftSection: ReactNode;
  rightSection: ReactNode;
}

export type PendingActionToastProps = Omit<ToastProps, 'ttl'>;
