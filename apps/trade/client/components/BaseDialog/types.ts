import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

export interface BaseDialogProps extends WithChildren, WithClassnames {
  open: boolean;

  onOpenChange(open: boolean): void;
}

export interface BaseDialogTitleProps extends WithChildren, WithClassnames {
  endElement?: ReactNode;

  // If not defined, no close button will be rendered
  onClose?: () => void;
}

export interface BaseDialogBodyProps extends WithChildren, WithClassnames {}
