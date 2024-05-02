import { useTextSearch } from 'client/hooks/ui/useTextSearch';
import { useState } from 'react';
import { FaqItem, useFaqItems } from './useFaqItems';

function getSearchString(item: FaqItem) {
  return item.title;
}

export function usePortfolioFaqPage() {
  const faqItems = useFaqItems();
  const [query, setQuery] = useState('');
  const [activeAccordionTitles, setActiveAccordionTitles] = useState<string[]>(
    [],
  );

  const { results } = useTextSearch({
    query,
    items: faqItems,
    getSearchString,
  });

  return {
    results,
    query,
    setQuery,
    activeAccordionTitles,
    setActiveAccordionTitles,
  };
}
