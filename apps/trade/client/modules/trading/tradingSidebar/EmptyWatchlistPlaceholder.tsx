import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';

export function EmptyWatchlistPlaceholder({ className }: WithClassnames) {
  return (
    <div
      className={mergeClassNames(
        'flex flex-col gap-y-2.5 px-3 pt-2',
        className,
      )}
    >
      <p>Your watchlist is empty</p>

      <p className="text-text-tertiary text-xs leading-relaxed">
        Navigate to your favorite markets quickly.
        <br />
        Click <Icons.Star size={16} className="inline px-0.5" /> to add markets
        to your watchlist.
      </p>
    </div>
  );
}
