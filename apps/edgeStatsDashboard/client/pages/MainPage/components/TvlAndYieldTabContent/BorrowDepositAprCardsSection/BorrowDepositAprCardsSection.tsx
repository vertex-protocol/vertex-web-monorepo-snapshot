import { LinkButton } from '@vertex-protocol/web-ui';
import { MarketWithRateList } from 'client/components/MarketWithRateList';
import { StatsSection } from 'client/components/StatsSection';
import { LINKS } from 'client/config/links';
import { useEdgeLowestBorrowAprsCardData } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprCardsSection/useEdgeLowestBorrowAprsCardData';
import { useEdgeTopDepositAprsCardData } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositAprCardsSection/useEdgeTopDepositAprsCardData';

import Link from 'next/link';

export function BorrowDepositAprCardsSection() {
  const {
    data: edgeLowestBorrowAprsCardData,
    isLoading: isLoadingEdgeLowestBorrowAprsCardData,
  } = useEdgeLowestBorrowAprsCardData();
  const {
    data: edgeTopDepositAprsCardData,
    isLoading: isLoadingEdgeTopDepositAprsCardData,
  } = useEdgeTopDepositAprsCardData();

  return (
    <StatsSection className="sm:grid-cols-2">
      <MarketWithRateList.Card
        title="Top Deposit APRs"
        description="The highest deposit APRs, calculated based on current utilization rates."
        isLoading={isLoadingEdgeTopDepositAprsCardData}
        data={edgeTopDepositAprsCardData?.topDepositAprs}
        renderListItem={({ asset, rate }) => (
          <MarketWithRateList.Item
            key={asset}
            asset={asset}
            rate={rate}
            rateClassName="text-positive"
          />
        )}
        footerAction={
          <LinkButton
            as={Link}
            href={LINKS.vertexAppMarkets}
            colorVariant="primary"
            className="text-xs"
            external
            withExternalIcon
          >
            See all Deposit APRs
          </LinkButton>
        }
      />
      <MarketWithRateList.Card
        title="Lowest Borrow APRs"
        description="The lowest borrow APRs, calculated based on current utilization rates."
        isLoading={isLoadingEdgeLowestBorrowAprsCardData}
        data={edgeLowestBorrowAprsCardData?.lowestBorrowAprs}
        renderListItem={({ asset, rate }) => (
          <MarketWithRateList.Item
            key={asset}
            asset={asset}
            rate={rate}
            rateClassName="text-negative"
          />
        )}
        footerAction={
          <LinkButton
            as={Link}
            href={LINKS.vertexAppMarkets}
            colorVariant="primary"
            className="text-xs"
            external
            withExternalIcon
          >
            See all Borrow APRs
          </LinkButton>
        }
      />
    </StatsSection>
  );
}
