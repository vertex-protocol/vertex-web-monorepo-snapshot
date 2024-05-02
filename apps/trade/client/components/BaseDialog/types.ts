import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';

export interface BaseDialogProps extends WithChildren, WithClassnames {
  open: boolean;

  onOpenChange(open: boolean): void;
}

export interface BaseDialogTitleProps extends WithChildren, WithClassnames {
  endElement?: React.ReactNode;

  // If not defined, no close button will be rendered
  onClose?: () => void;
}

export interface BaseDialogBodyProps extends WithChildren, WithClassnames {}
