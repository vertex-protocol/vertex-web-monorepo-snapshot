import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';

export interface BaseDialogProps extends WithChildren, WithClassnames {
  open: boolean;

  onOpenChange(open: boolean): void;
}

export interface BaseDialogTitleProps extends WithChildren, WithClassnames {}

export interface BaseDialogBodyProps extends WithChildren, WithClassnames {
  /**
   * This renders `children` directly instead of within a wrapper element.
   * Note, `children` should be a single React element and it should accept the `className` prop.
   */
  asChild?: boolean;
}

export interface BaseDialogFooterProps extends WithChildren, WithClassnames {}
