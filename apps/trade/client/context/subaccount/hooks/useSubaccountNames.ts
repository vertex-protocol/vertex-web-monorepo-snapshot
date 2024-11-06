import { useListSubaccounts } from 'client/hooks/query/subaccount/useListSubaccounts';
import { PRIMARY_SUBACCOUNT_NAME } from 'client/modules/subaccounts/consts';
import { isAppSubaccountName } from 'client/modules/subaccounts/utils/isAppSubaccountName';
import { partition } from 'lodash';
import { useMemo } from 'react';

interface UseSubaccountNames {
  /**
   * Known subaccount names created on the FE.
   */
  app: string[];
  /**
   * Other subaccount names created via the API
   */
  api: string[];
  all: string[];
}

/**
 * Returns arrays of subaccount names created via the FE and via the API.
 * The primary FE subaccount is always included regardless of whether it exists on the BE or not
 */
export function useSubaccountNames(): UseSubaccountNames {
  const { data: subaccounts } = useListSubaccounts();

  return useMemo(() => {
    if (!subaccounts) {
      return {
        app: [PRIMARY_SUBACCOUNT_NAME],
        api: [],
        all: [PRIMARY_SUBACCOUNT_NAME],
      };
    }

    const [appSubaccountNamesFromQuery, apiSubaccountNames] = partition(
      subaccounts?.map(({ subaccountName }) => subaccountName),
      (subaccountName) => isAppSubaccountName(subaccountName),
    );

    // Ensure that the primary subaccount is always included & first in the list
    const appSubaccountNames = [
      PRIMARY_SUBACCOUNT_NAME,
      ...appSubaccountNamesFromQuery.filter(
        (name) => name !== PRIMARY_SUBACCOUNT_NAME,
      ),
    ];

    return {
      app: appSubaccountNames,
      api: apiSubaccountNames,
      all: [...appSubaccountNames, ...apiSubaccountNames],
    };
  }, [subaccounts]);
}
