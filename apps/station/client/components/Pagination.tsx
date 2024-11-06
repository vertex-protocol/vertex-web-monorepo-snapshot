import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { Dispatch, SetStateAction } from 'react';

interface Props extends WithClassnames {
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  hasNextPage: boolean;
}

export function Pagination({
  pageIndex,
  setPageIndex,
  hasNextPage,
  className,
}: Props) {
  return (
    <div className={joinClassNames('flex items-center gap-x-4', className)}>
      <SecondaryButton
        size="xs"
        startIcon={<Icons.CaretLeft />}
        onClick={() => setPageIndex((prev) => prev - 1)}
        disabled={pageIndex === 0}
      >
        Prev
      </SecondaryButton>
      <span>{pageIndex + 1}</span>
      <SecondaryButton
        size="xs"
        endIcon={<Icons.CaretRight />}
        onClick={() => setPageIndex((prev) => prev + 1)}
        disabled={!hasNextPage}
      >
        Next
      </SecondaryButton>
    </div>
  );
}
