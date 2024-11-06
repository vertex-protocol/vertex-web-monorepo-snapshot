import { BigDecimal } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  Button,
  CARD_BORDER_RADIUS_VARIANT,
  getStateOverlayClassNames,
  Icons,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
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
    config: { requiredProductBalanceMetadata },
  } = useTradingCompetitionContext();

  const minEligibilityThresholdLabel = requiredProductBalanceMetadata
    ? `Min. ${requiredProductBalanceMetadata.symbol} Balance`
    : 'Min. Account Size';

  const minEligibilityThresholdTooltipId: DefinitionTooltipID =
    requiredProductBalanceMetadata
      ? 'tradingCompetitionMinAssetBalance'
      : 'tradingCompetitionMinAccountSize';

  const minEligibilityThresholdFormatSpecifier = requiredProductBalanceMetadata
    ? PresetNumberFormatSpecifier.NUMBER_INT
    : PresetNumberFormatSpecifier.CURRENCY_INT;

  return (
    <TradingCompetitionCard.Container
      className={href ? hoverStateOverlayClassNames : undefined}
    >
      <Button
        as={href ? Link : 'div'}
        href={href ?? ''}
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
                  <span className="text-text-tertiary text-xs sm:text-sm">
                    {prize.symbol}
                  </span>
                </Fragment>
              ))}
            />
          </div>
          <div className="flex flex-col justify-between gap-y-3 lg:flex-row">
            <ValueWithLabel.Vertical
              sizeVariant="sm"
              label={minEligibilityThresholdLabel}
              tooltip={{ id: minEligibilityThresholdTooltipId }}
              value={minEligibilityThreshold}
              numberFormatSpecifier={minEligibilityThresholdFormatSpecifier}
              valueClassName="items-center gap-x-2"
              valueEndElement={
                requiredProductBalanceMetadata ? (
                  <Image
                    src={requiredProductBalanceMetadata.iconSrc}
                    className="size-4"
                    alt={requiredProductBalanceMetadata.symbol}
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
