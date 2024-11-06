import { ELECTION_PRODUCT_IDS } from '@vertex-protocol/metadata';
import { LinkButton } from '@vertex-protocol/web-ui';
import { useSpotOrderFormContext } from 'client/pages/SpotTrading/context/SpotOrderFormContext';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export function PredictionMarketInfo() {
  const { currentMarket } = useSpotOrderFormContext();

  if (
    !currentMarket ||
    !ELECTION_PRODUCT_IDS.includes(currentMarket.productId)
  ) {
    return null;
  }

  return (
    <p className="text-text-tertiary text-xs">
      <span className="text-text-primary">
        {currentMarket.metadata.marketName}
      </span>{' '}
      is a prediction market for the 2024 US presidential election. Please see
      the{' '}
      <LinkButton
        colorVariant="accent"
        className="inline"
        as={Link}
        external
        href={VERTEX_SPECIFIC_LINKS.electionTokensDocs}
      >
        docs
      </LinkButton>{' '}
      for more details on how to participate.
    </p>
  );
}
