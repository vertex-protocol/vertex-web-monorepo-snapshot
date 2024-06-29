import { LinkButton } from 'client/components/LinkButton';
import { ToastProps } from 'client/components/Toast/types';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { NewFeatureDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { TOAST_MARKET_ICON_CLASSNAME } from 'client/modules/notifications/components/consts';
import { NewFeatureNotification } from 'client/modules/notifications/components/newFeature/NewFeatureNotification';
import { PerpProductMetadata } from 'common/productMetadata/types';
import Image from 'next/image';

interface Props extends ToastProps {
  disclosureKey: NewFeatureDisclosureKey;
  metadata: PerpProductMetadata;
  productId: number;
}

export function PerpMarketFeatureNotification({
  disclosureKey,
  metadata,
  productId,
  onDismiss: baseOnDismiss,
  ...rest
}: Props) {
  const pushTradePage = usePushTradePage();
  const { dismiss: dismissNewFeatureNotification } =
    useShowUserDisclosure(disclosureKey);

  const onDismiss = () => {
    baseOnDismiss();
    dismissNewFeatureNotification();
  };

  const onLinkClick = () => {
    pushTradePage({ productId });
    onDismiss();
  };

  const marketName = metadata.marketName;
  const icon = metadata.icon;

  const content = (
    <div className="flex flex-col gap-y-3">
      <p>
        GM! You can now trade{' '}
        <span className="text-text-primary">{marketName} Perpetual</span>{' '}
        contracts.
      </p>
      <div className="flex items-center gap-x-2">
        <Image
          className={TOAST_MARKET_ICON_CLASSNAME}
          src={icon.asset}
          alt={marketName}
        />
        <LinkButton colorVariant="primary" onClick={onLinkClick}>
          Trade {marketName}
        </LinkButton>
      </div>
    </div>
  );

  return (
    <NewFeatureNotification
      title={`New Market: ${marketName}`}
      content={content}
      onDismiss={onDismiss}
      {...rest}
    />
  );
}
