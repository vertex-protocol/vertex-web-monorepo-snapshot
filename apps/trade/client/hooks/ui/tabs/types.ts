export interface TabIdentifiable<TIdentifier extends string> {
  id: TIdentifier;
}

export type TabIdentifiableID<TTab extends TabIdentifiable<string>> =
  TTab['id'];

export type TabIdentifiableList<TTab extends TabIdentifiable<string>> =
  | TTab[]
  | Readonly<TTab[]>;
