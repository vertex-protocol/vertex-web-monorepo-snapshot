import { WithChildren } from '@vertex-protocol/web-common';
import { Spinner } from '@vertex-protocol/web-ui';
import { NoDataStateContainer } from 'client/components/NoDataStateContainer';

interface Props extends WithChildren {
  isLoading: boolean;
  isEmpty: boolean;
}

/**
 * Container for cards with empty and loading states
 */
export function CardsContainer({ isLoading, isEmpty, children }: Props) {
  if (isLoading) {
    return (
      <NoDataStateContainer>
        <Spinner size={48} />
      </NoDataStateContainer>
    );
  }

  if (isEmpty) {
    return <NoDataStateContainer>No items found</NoDataStateContainer>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 empty:hidden sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}
