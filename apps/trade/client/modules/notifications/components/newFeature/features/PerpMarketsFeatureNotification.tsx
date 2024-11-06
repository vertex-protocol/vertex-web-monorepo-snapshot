import { ToastProps } from 'client/components/Toast/types';
import { NewFeatureDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { TOAST_MARKET_ICON_CLASSNAME } from 'client/modules/notifications/components/consts';
import { NewFeatureNotification } from 'client/modules/notifications/components/newFeature/NewFeatureNotification';
import { PerpProductMetadata } from '@vertex-protocol/metadata';
import Image from 'next/image';

interface Props extends ToastProps {
  disclosureKey: NewFeatureDisclosureKey;
  markets: PerpProductMetadata[];
}

export function PerpMarketsFeatureNotification({
  markets,
  disclosureKey,
  onDismiss,
  ...rest
}: Props) {
  const { dismiss: dismissNewFeatureNotification } =
    useShowUserDisclosure(disclosureKey);

  const onDismissClick = () => {
    onDismiss();
    dismissNewFeatureNotification();
  };

  const content = (
    <div className="flex flex-col gap-y-3">
      <p>
        GM! We&apos;ve added{' '}
        <span className="text-text-primary">
          {markets.length.toFixed()} new perp markets:
        </span>
      </p>
      <div className="grid max-w-[80%] grid-cols-2 justify-items-start gap-2">
        {markets.map((market) => {
          return (
            <div className="flex items-center gap-x-2" key={market.marketName}>
              <Image
                className={TOAST_MARKET_ICON_CLASSNAME}
                src={market.icon.asset}
                alt={market.marketName}
              />
              <div className="text-text-primary">{market.marketName}</div>
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
