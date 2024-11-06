import { ToastProps } from 'client/components/Toast/types';
import { NewFeatureDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { TOAST_MARKET_ICON_CLASSNAME } from 'client/modules/notifications/components/consts';
import { NewFeatureNotification } from 'client/modules/notifications/components/newFeature/NewFeatureNotification';
import { PerpProductMetadata } from '@vertex-protocol/metadata';
import Image from 'next/image';
import { LinkButton } from '@vertex-protocol/web-ui';
import Link from 'next/link';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { get } from 'lodash';

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
  const { dismiss: dismissNewFeatureNotification } =
    useShowUserDisclosure(disclosureKey);
  const productTradingLinks = useProductTradingLinks();

  const onDismiss = () => {
    baseOnDismiss();
    dismissNewFeatureNotification();
  };

  const onLinkClick = () => {
    onDismiss();
  };

  const marketName = metadata.marketName;
  const icon = metadata.icon;

  const productTradingLink = get(productTradingLinks, productId, undefined);

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
        {productTradingLink && (
          <LinkButton
            as={Link}
            colorVariant="primary"
            href={productTradingLink.link}
            onClick={onLinkClick}
          >
            Trade {marketName}
          </LinkButton>
        )}
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
