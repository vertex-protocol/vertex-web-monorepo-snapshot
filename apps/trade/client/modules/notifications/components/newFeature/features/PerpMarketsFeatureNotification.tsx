import { ToastProps } from 'client/components/Toast/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { FeatureNotificationDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { TOAST_MARKET_ICON_CLASSNAME } from 'client/modules/notifications/components/consts';
import { NewFeatureNotification } from 'client/modules/notifications/components/newFeature/NewFeatureNotification';
import Image from 'next/image';

interface Props extends ToastProps {
  disclosureKey: FeatureNotificationDisclosureKey;
  productIds: number[];
}

export function PerpMarketsFeatureNotification({
  productIds,
  disclosureKey,
  onDismiss,
  ...rest
}: Props) {
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const { dismiss: dismissNewFeatureNotification } =
    useShowUserDisclosure(disclosureKey);

  const onDismissClick = () => {
    onDismiss();
    dismissNewFeatureNotification();
  };

  if (!allMarketsStaticData) {
    return null;
  }

  const content = (
    <div className="flex flex-col gap-y-3">
      <p>
        GM! We&apos;ve added{' '}
        <span className="text-text-primary">
          {productIds.length.toFixed()} new perp markets:
        </span>
      </p>
      <div className="grid max-w-[80%] grid-cols-2 justify-items-start gap-2">
        {productIds.map((productId) => {
          const market = allMarketsStaticData.perpMarkets[productId];

          if (!market) {
            return null;
          }
          const metadata = market.metadata;

          return (
            <div
              className="flex items-center gap-x-2"
              key={metadata.marketName}
            >
              <Image
                className={TOAST_MARKET_ICON_CLASSNAME}
                src={metadata.icon.asset}
                alt={metadata.marketName}
              />
              <div className="text-text-primary">{metadata.marketName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <NewFeatureNotification
      title="New Perp Markets"
      content={content}
      onDismiss={onDismissClick}
      {...rest}
    />
  );
}
