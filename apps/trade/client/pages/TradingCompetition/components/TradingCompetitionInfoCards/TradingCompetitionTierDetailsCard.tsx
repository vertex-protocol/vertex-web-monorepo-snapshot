import { BigDecimal } from '@vertex-protocol/client';
import {
  PresetNumberFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  Button,
  ButtonAsDivProps,
  ButtonAsLinkProps,
  CARD_BORDER_RADIUS_VARIANT,
  getStateOverlayClassNames,
  Icons,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { PrizePool } from 'client/modules/tradingCompetition/types';
import { TradingCompetitionBlitzDetailsCardBgImage } from 'client/pages/TradingCompetition/components/blitz/TradingCompetitionBlitzDetailsCardBgImage';
import { TradingCompetitionCard } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionCard';
import { TradingCompetitionVertexDetailsCardBgImage } from 'client/pages/TradingCompetition/components/vertex/TradingCompetitionVertexDetailsCardBgImage';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { clientEnv } from 'common/environment/clientEnv';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, ReactNode } from 'react';

interface Props extends WithClassnames {
  href?: string;
  header: ReactNode;
  prizePool: PrizePool | undefined;
  minEligibilityThreshold: BigDecimal;
  minVolume: BigDecimal;
  numWinners: number;
}

export function TradingCompetitionTierDetailsCard({
  href,
  header,
  prizePool,
  minEligibilityThreshold,
  minVolume,
  numWinners,
}: Props) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: CARD_BORDER_RADIUS_VARIANT,
  });
  const {
    config: { eligibilityRequirement },
  } = useTradingCompetitionContext();

  const { eligibilityType, productMetadata } = eligibilityRequirement;

  const minEligibilityThresholdLabel = {
    account_value: 'Min. Account Size',
    product_balance: `Min. ${productMetadata?.symbol} Balance`,
    staked_vrtx: `Min. ${productMetadata?.symbol} Staked`,
  }[eligibilityType];

  const minEligibilityThresholdFormatSpecifier =
    eligibilityType === 'account_value'
      ? PresetNumberFormatSpecifier.CURRENCY_INT
      : PresetNumberFormatSpecifier.NUMBER_INT;

  const buttonProps = href
    ? ({ as: Link, href } satisfies ButtonAsLinkProps)
    : ({ as: 'div' } satisfies ButtonAsDivProps);

  return (
    <TradingCompetitionCard.Container
      className={href ? hoverStateOverlayClassNames : undefined}
    >
      <Button
        {...buttonProps}
        className={joinClassNames(
          'relative flex h-full flex-col items-stretch',
          // Override the "button" `cursor-pointer` when this isn't a link.
          !href && 'cursor-default',
        )}
      >
        <TradingCompetitionCard.Body className="grid grid-cols-2 gap-x-4 sm:p-10">
          <div className="flex flex-col">
            <ValueWithLabel.Vertical
              label={header}
              labelClassName="text-lg sm:text-2xl"
              valueContent={prizePool?.map((prize) => (
                <Fragment key={prize.symbol}>
                  <span className="text-2xl sm:text-4xl">{prize.amount}</span>
                  <span className="text-xs sm:text-sm">{prize.symbol}</span>
                </Fragment>
              ))}
            />
          </div>
          <div className="flex flex-col justify-between gap-y-3 lg:flex-row">
            <ValueWithLabel.Vertical
              sizeVariant="sm"
              label={minEligibilityThresholdLabel}
              tooltip={{ id: 'tradingCompetitionRequirementToJoin' }}
              value={minEligibilityThreshold}
              numberFormatSpecifier={minEligibilityThresholdFormatSpecifier}
              valueClassName="items-center gap-x-2"
              valueEndElement={
                productMetadata ? (
                  <Image
                    src={productMetadata.iconSrc}
                    className="h-4 w-auto"
                    alt={productMetadata.symbol}
                  />
                ) : undefined
              }
            />
            <ValueWithLabel.Vertical
              sizeVariant="sm"
              label="Min. Volume"
              tooltip={{ id: 'tradingCompetitionMinVolume' }}
              value={minVolume}
              numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
              valueEndElement={primaryQuoteToken.symbol}
            />
          </div>
        </TradingCompetitionCard.Body>
        <TradingCompetitionCard.Footer>
          <span>
            <span className="text-text-primary">{numWinners}</span> winners
          </span>
          {href && (
            <span className="text-text-secondary flex items-center gap-x-1">
              Go to competition <Icons.ArrowRight />
            </span>
          )}
        </TradingCompetitionCard.Footer>
      </Button>
      {clientEnv.base.brandName === 'vertex' ? (
        <TradingCompetitionVertexDetailsCardBgImage />
      ) : (
        <TradingCompetitionBlitzDetailsCardBgImage />
      )}
    </TradingCompetitionCard.Container>
  );
}
