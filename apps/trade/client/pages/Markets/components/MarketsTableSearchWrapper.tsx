import { SearchBar } from '@vertex-protocol/web-ui';
import { ReactElement, useState } from 'react';

interface Props {
  renderTable: ({ query }: { query: string }) => ReactElement;
}

export function MarketsTableSearchWrapper({ renderTable }: Props) {
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-col gap-y-2">
      <SearchBar
        query={query}
        setQuery={setQuery}
        sizeVariant="xs"
        placeholder="Search markets"
        className="lg:w-80"
      />
      {renderTable({ query })}
    </div>
  );
}
