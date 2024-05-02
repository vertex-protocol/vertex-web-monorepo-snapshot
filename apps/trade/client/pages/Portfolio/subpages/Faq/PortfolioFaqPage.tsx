import * as Accordion from '@radix-ui/react-accordion';
import { SearchBar } from 'client/components/SearchBar';
import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';
import { PortfolioPageContentWrapper } from 'client/pages/Portfolio/components/PortfolioPageContentWrapper';
import { usePortfolioFaqPage } from 'client/pages/Portfolio/subpages/Faq/hooks/usePortfolioFaqPage';
import { FaqAccordionItem } from './components/FaqAccordionItem';
import { FaqLinks } from './components/FaqLinks';

export function PortfolioFaqPage() {
  const {
    results,
    query,
    setQuery,
    setActiveAccordionTitles,
    activeAccordionTitles,
  } = usePortfolioFaqPage();

  return (
    <PortfolioPageContentWrapper>
      <div className="flex flex-col-reverse gap-x-20 gap-y-8 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-y-3 lg:flex-1 lg:gap-y-6">
          <PortfolioHeader>Frequently Asked Questions</PortfolioHeader>
          <SearchBar
            inputClassName="py-1 text-sm"
            placeholder="Search"
            iconSize={16}
            query={query}
            setQuery={setQuery}
          />
          <Accordion.Root
            type="multiple"
            className="flex flex-col gap-y-3 lg:gap-y-4"
            value={activeAccordionTitles}
            onValueChange={setActiveAccordionTitles}
          >
            {results.map((item) => {
              const { title } = item;

              return (
                <FaqAccordionItem
                  key={title}
                  open={activeAccordionTitles.includes(title)}
                  item={item}
                />
              );
            })}
          </Accordion.Root>
        </div>
        <FaqLinks className="lg:w-[325px]" />
      </div>
    </PortfolioPageContentWrapper>
  );
}
