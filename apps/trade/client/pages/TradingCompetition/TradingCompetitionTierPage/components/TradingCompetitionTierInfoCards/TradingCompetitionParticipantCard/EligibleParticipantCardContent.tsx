import { IndexerLeaderboardParticipant } from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
  signDependentValue,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { TradingCompetitionCard } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionCard';

interface Props {
  participant: IndexerLeaderboardParticipant;
}

export function EligibleParticipantCardContent({ participant }: Props) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const { pnl, volume, roiRank, percentRoi } = participant;

  const pnlUsd = pnl.multipliedBy(primaryQuotePriceUsd);

  return (
    <>
      <TradingCompetitionCard.Body className="gap-4 sm:gap-6">
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="Your Rank"
          valueClassName="bg-surface-3 rounded-sm px-2 w-max"
          valueContent={`#${formatNumber(roiRank, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
          })}`}
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="% ROI"
          value={percentRoi}
          numberFormatSpecifier={
            PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP
          }
          valueClassName={signDependentValue(percentRoi, {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: 'text-text-primary',
          })}
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="PnL"
          value={pnlUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          valueClassName={signDependentValue(pnlUsd, {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: 'text-text-primary',
          })}
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="Volume"
          value={volume}
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
          }
          valueEndElement={primaryQuoteToken.symbol}
        />
      </TradingCompetitionCard.Body>
      <TradingCompetitionCard.Footer>
        Meet the min. volume before competition ends to be eligible.
      </TradingCompetitionCard.Footer>
    </>
  );
}
