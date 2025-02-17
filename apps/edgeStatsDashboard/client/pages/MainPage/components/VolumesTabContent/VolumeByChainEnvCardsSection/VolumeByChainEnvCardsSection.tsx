import { BigDecimal, ChainEnv } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import {
  CustomNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { Card, Value } from '@vertex-protocol/web-ui';
import { useVolumeByChainEnvCardsSectionData } from 'client/pages/MainPage/components/VolumesTabContent/VolumeByChainEnvCardsSection/useVolumeByChainEnvCardsSectionData';
import Image from 'next/image';

export function VolumeByChainEnvCardsSection() {
  const { data } = useVolumeByChainEnvCardsSectionData();

  return (
    // Add pb to ensure a gap between the scrollbar and the content
    <div className="flex gap-6 overflow-x-auto pb-2">
      {data.map(({ chainEnv, totalVolume24hUsd, totalVolumeAllTimeUsd }) => (
        <ChainEnvVolumesCard
          key={chainEnv}
          chainEnv={chainEnv}
          totalVolume24hUsd={totalVolume24hUsd}
          totalVolumeAllTimeUsd={totalVolumeAllTimeUsd}
        />
      ))}
    </div>
  );
}

function ChainEnvVolumesCard({
  chainEnv,
  totalVolume24hUsd,
  totalVolumeAllTimeUsd,
}: {
  chainEnv: ChainEnv;
  totalVolume24hUsd: BigDecimal | undefined;
  totalVolumeAllTimeUsd: BigDecimal | undefined;
}) {
  const { getChainMetadata } = useVertexMetadataContext();

  const { name, chainIcon } = getChainMetadata(chainEnv);

  const formattedTotalVolume24hUsd = formatNumber(totalVolume24hUsd, {
    formatSpecifier: CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
  });
  const formattedTotalVolumeAllTimeUsd = formatNumber(totalVolumeAllTimeUsd, {
    formatSpecifier: CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
  });

  return (
    <Card className="flex min-w-64 flex-col gap-y-4 p-6">
      <div className="text-sm">
        <div className="flex items-center gap-x-1">
          <Image src={chainIcon} className="h-4 w-4" alt="" />
          <div className="text-text-primary font-semibold">{name}</div>
        </div>
        <div className="text-text-secondary font-medium">24h / Total Vol</div>
      </div>
      <Value className="font-semibold" sizeVariant="lg">
        {formattedTotalVolume24hUsd}
        <span className="text-stroke"> / </span>
        {formattedTotalVolumeAllTimeUsd}
      </Value>
    </Card>
  );
}
