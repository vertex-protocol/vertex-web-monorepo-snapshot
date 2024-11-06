import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Divider } from '@vertex-protocol/web-ui';
import { TradingCompetitionTablePrize } from 'client/pages/TradingCompetition/TradingCompetitionTierPage/components/TradingCompetitionTablePrize';
import { BLITZ_SPECIFIC_IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';

interface Props {
  usdbAmount?: number;
  goldAmount?: number;
}

export function TradingCompetitionBlitzPrize({
  usdbAmount,
  goldAmount,
}: Props) {
  return (
    <div className="flex items-center gap-x-2">
      {usdbAmount && (
        <TradingCompetitionTablePrize amount={usdbAmount} symbol="USDB" />
      )}
      {usdbAmount && goldAmount && <Divider vertical className="h-3" />}
      {goldAmount && (
        <div className="text-text-primary flex gap-x-1">
          <Image
            src={BLITZ_SPECIFIC_IMAGES.blastGoldIcon}
            alt="Blast gold"
            className="h-4 w-auto"
          />
          {formatNumber(goldAmount, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
          })}
        </div>
      )}
    </div>
  );
}
