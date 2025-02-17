import { LinkButton } from '@vertex-protocol/web-ui';
import { MarketWithRateList } from 'client/components/MarketWithRateList';
import { StatsSection } from 'client/components/StatsSection';
import { LINKS } from 'client/config/links';
import { useEdgeTopBorrowAprsCardData } from 'client/pages/MainPage/components/TvlAndYieldTabContent/TopBorrowDepositAprCardsSection/useEdgeTopBorrowAprsCardData';
import { useEdgeTopDepositAprsCardData } from 'client/pages/MainPage/components/TvlAndYieldTabContent/TopBorrowDepositAprCardsSection/useEdgeTopDepositAprsCardData';

import Link from 'next/link';

export function TopBorrowDepositAprCardsSection() {
  const {
    data: edgeTopBorrowAprsCardData,
    isLoading: isLoadingEdgeTopBorrowAprsCardData,
  } = useEdgeTopBorrowAprsCardData();
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
        title="Top Borrow APRs"
        description="The highest borrow APRs, calculated based on current utilization rates."
        isLoading={isLoadingEdgeTopBorrowAprsCardData}
        data={edgeTopBorrowAprsCardData?.topBorrowAprs}
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
