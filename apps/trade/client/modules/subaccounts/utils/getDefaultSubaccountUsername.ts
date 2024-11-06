import { PRIMARY_SUBACCOUNT_NAME } from 'client/modules/subaccounts/consts';

export function getDefaultSubaccountUsername(subaccountName: string) {
  if (subaccountName === PRIMARY_SUBACCOUNT_NAME) {
    return 'Account 1';
  }

  // Match only subbacount names that we create on the FE, which should have
  // the pattern "default_x", where "x" is some number (e.g. default_1).
  // Additionally capture the "x" so we can extract it if necessary.
  const match = subaccountName.match(/^default_(\d+)$/);

  if (match) {
    // Extract the captured "x" noted above.
    const id = match[1];

    // Note the extracted number acts like an index, e.g. `default_1` actually
    // refers to the 2nd subaccount (created via the FE). So we want to add 1
    // here to get the correct default name.
    return `Account ${parseInt(id) + 1}`;
  }

  return subaccountName;
}
