import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import Image from 'next/image';

interface Props {
  productId?: number;
}

export function MarketDetailsPromptEntrypoint({ productId }: Props) {
  const { trackEvent } = useAnalyticsContext();
  const { show } = useDialog();
  const { data: allMarkets } = useAllMarketsStaticData();

  if (!productId) {
    return null;
  }

  const metadata = allMarkets?.all[productId]?.metadata;

  if (!metadata) {
    return null;
  }

  const { icon } = getBaseProductMetadata(metadata);

  return (
    <SecondaryButton
      className="bg-surface-1 flex items-center justify-between px-1.5 text-xs"
      onClick={() => {
        show({ type: 'market_details', params: { productId } });
        trackEvent({
          type: 'market_details_entrypoint_clicked',
          data: {},
        });
      }}
    >
      <div className="flex items-center gap-x-2.5">
        <Image
          src={icon.asset}
          alt={metadata.marketName}
          className="h-auto w-6"
        />
        <div className="flex flex-col items-start">
          <span className="text-text-primary whitespace-nowrap">
            Market Details
          </span>
          <span className="text-text-tertiary">{metadata.marketName}</span>
        </div>
      </div>
      <Icons.FiChevronRight size={16} className="text-text-tertiary" />
    </SecondaryButton>
  );
}
