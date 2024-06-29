import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Command } from 'cmdk';

export function NoResultsMessage({ className }: WithClassnames) {
  return (
    <Command.Empty
      className={joinClassNames(
        'text-text-tertiary flex items-center justify-center px-10 text-center text-xs',
        className,
      )}
      asChild
    >
      <p>
        No search results found. Please ensure that you have typed the search
        term correctly.
      </p>
    </Command.Empty>
  );
}
