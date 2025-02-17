import { useListSubaccounts } from 'client/hooks/query/subaccount/useListSubaccounts';
import { PRIMARY_SUBACCOUNT_NAME } from 'client/modules/subaccounts/consts';
import { isAppSubaccountName } from 'client/modules/subaccounts/utils/isAppSubaccountName';
import { isIsoSubaccountName } from 'client/utils/isIsoSubaccount';
import { partition } from 'lodash';
import { useMemo } from 'react';

interface UseSubaccountNames {
  /**
   * Known subaccount names created on the FE.
   */
  app: string[];
  /**
   * Other subaccount names created via the API, excluding isolated subaccounts
   */
  api: string[];
  all: string[];
}

/**
 * Returns arrays of subaccount names created via the FE and via the API. Isolated subaccounts are filtered out of the API list.
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

    const [appSubaccountNamesFromQuery, apiSubaccountNamesFromQuery] =
      partition(
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

    // Filter out iso subaccount names
    const apiSubaccountNames = apiSubaccountNamesFromQuery.filter(
      (name) => !isIsoSubaccountName(name),
    );

    return {
      app: appSubaccountNames,
      api: apiSubaccountNames,
      all: [...appSubaccountNames, ...apiSubaccountNames],
    };
  }, [subaccounts]);
}
