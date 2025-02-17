import {
  DELIST_REDUCE_ONLY_TIME_MILLIS,
  PENDING_DELIST_PERP_PRODUCT_IDS,
} from '@vertex-protocol/react-client';
import {
  formatTimestamp,
  LinkButton,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { ToastProps } from 'client/components/Toast/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { FeatureNotificationDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { NewFeatureNotification } from 'client/modules/notifications/components/newFeature/NewFeatureNotification';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { LINKS } from 'common/brandMetadata/links/links';
import Image from 'next/image';
import Link from 'next/link';

interface Props extends ToastProps {
  disclosureKey: FeatureNotificationDisclosureKey;
}

export function PendingDelistFeatureNotification({
  disclosureKey,
  onDismiss: baseOnDismiss,
  ...rest
}: Props) {
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const pushTradePage = usePushTradePage();
  const { dismiss: dismissNewFeatureNotification } =
    useShowUserDisclosure(disclosureKey);

  const onDismissClick = () => {
    baseOnDismiss();
    dismissNewFeatureNotification();
  };

  if (!allMarketsStaticData) {
    return null;
  }

  const delistTime = formatTimestamp(DELIST_REDUCE_ONLY_TIME_MILLIS, {
    formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
  });

  const content = (
    <div className="flex flex-col items-start gap-y-3">
      <p>
        The following markets will be delisted at{' '}
        <span className="text-text-primary">{delistTime}</span>. Please manage
        your positions.{' '}
        <LinkButton
          colorVariant="primary"
          as={Link}
          external
          withExternalIcon
          href={LINKS.feb13DelistInfo}
        >
          Full Details
        </LinkButton>
      </p>
      <div className="flex flex-wrap gap-x-2 gap-y-3">
        {Array.from(PENDING_DELIST_PERP_PRODUCT_IDS).map((productId) => {
          const marketStaticData = allMarketsStaticData.all[productId];

          if (!marketStaticData) {
            return null;
          }
          const sharedProductMetadata = getSharedProductMetadata(
            marketStaticData.metadata,
          );

          return (
            <LinkButton
              colorVariant="primary"
              className="gap-x-1"
              onClick={() =>
                pushTradePage({
                  productId,
                })
              }
              key={productId}
            >
              <Image
                src={sharedProductMetadata.icon.asset}
                className="h-4 w-auto"
                alt={sharedProductMetadata.marketName}
              />
              {sharedProductMetadata.marketName}
            </LinkButton>
          );
        })}
      </div>
    </div>
  );

  return (
    <NewFeatureNotification
      title="Market Delistings"
      content={content}
      onDismiss={onDismissClick}
      {...rest}
    />
  );
}
