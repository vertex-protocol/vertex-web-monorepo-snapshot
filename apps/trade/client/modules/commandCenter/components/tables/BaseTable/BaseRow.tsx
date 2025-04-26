import { WithClassnames, mergeClassNames } from '@vertex-protocol/web-common';
import { getStateOverlayClassNames } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { Command } from 'cmdk';
import { ReactNode } from 'react';

interface Props extends WithClassnames {
  /**
   * Used by cmdk to track each item (note, cmdk calls this a `value` rather than an `id`).
   * The `id` should be stable across renders, otherewise cmdk won't be able to track it.
   */
  id: string;
  onSelect: () => void;
  children: ReactNode;
}

export function BaseRow({ id, className, children, onSelect, ...rest }: Props) {
  const { hide } = useDialog();

  const stateOverlayClassnames = getStateOverlayClassNames({
    borderRadiusVariant: 'sm',
    stateClassNameOverrides: 'data-[selected=true]:before:bg-overlay-hover',
  });

  return (
    <Command.Item
      className={mergeClassNames(
        'flex min-h-11 cursor-pointer items-center rounded-sm px-1.5 py-2',
        'bg-surface-card border-overlay-divider',
        stateOverlayClassnames,
        className,
      )}
      onSelect={() => {
        hide();
        onSelect();
      }}
      value={id}
      {...rest}
    >
      {children}
    </Command.Item>
  );
}
