import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import { ButtonAsLinkProps } from '@vertex-protocol/web-ui';

export interface ToastProps {
  ttl?: number;
  visible: boolean;

  onDismiss(): void;
}

export interface ToastBodyProps extends WithClassnames, WithChildren {}

export interface ToastContainerProps extends ToastBodyProps {
  visible: boolean;
}

export interface ToastSeparatorProps extends WithClassnames {
  ttl?: number;
}

export interface ToastHeaderProps extends ToastBodyProps {
  onDismiss(): void;
}

export interface ToastFooterLinkProps
  extends Omit<ButtonAsLinkProps, 'as' | 'color'> {}
