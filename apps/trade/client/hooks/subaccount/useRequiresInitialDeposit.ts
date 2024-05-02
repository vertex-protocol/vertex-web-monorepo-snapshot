import { useSubaccountCreationTime } from 'client/hooks/query/subaccount/useSubaccountCreationTime';

/**
 * A subaccount is created on deposit
 */
export function useRequiresInitialDeposit() {
  const { data } = useSubaccountCreationTime();

  // useSubaccountCreationTime returns null if the subaccount does not exist, and undefined when data has not yet loaded
  return data === null;
}
