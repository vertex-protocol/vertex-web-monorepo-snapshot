import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';

interface Props {
  pageIndex: number;
  canPreviousPage: boolean;
  canNextPage: boolean;

  previousPage(): void;

  nextPage(): void;
}

export function Pagination({
  pageIndex,
  canNextPage,
  canPreviousPage,
  nextPage,
  previousPage,
}: Props) {
  return (
    <div className="text-text-tertiary flex items-center">
      <SecondaryButton
        size="sm"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
        startIcon={<Icons.FiChevronLeft size={20} />}
      >
        Prev
      </SecondaryButton>
      <div className="flex h-full items-center justify-center px-3 text-sm">
        Page: {pageIndex + 1}
      </div>
      <SecondaryButton
        size="sm"
        onClick={() => nextPage()}
        disabled={!canNextPage}
        endIcon={<Icons.FiChevronRight size={20} />}
      >
        Next
      </SecondaryButton>
    </div>
  );
}
