import { LinkButton } from '@vertex-protocol/web-ui';
import { ToastProps } from 'client/components/Toast/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { FeatureNotificationDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { TOAST_MARKET_ICON_CLASSNAME } from 'client/modules/notifications/components/consts';
import { NewFeatureNotification } from 'client/modules/notifications/components/newFeature/NewFeatureNotification';
import { get } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';

interface Props extends ToastProps {
  disclosureKey: FeatureNotificationDisclosureKey;
  productId: number;
}

export function SpotMarketFeatureNotification({
  disclosureKey,
  productId,
  onDismiss: baseOnDismiss,
  ...rest
}: Props) {
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const showDialogForProduct = useShowDialogForProduct();
  const productTradingLinks = useProductTradingLinks();

  const { dismiss: dismissNewFeatureNotification } =
    useShowUserDisclosure(disclosureKey);

  const onDismiss = () => {
    baseOnDismiss();
    dismissNewFeatureNotification();
  };

  const onDepositClick = () => {
    showDialogForProduct({
      dialogType: 'deposit',
      productId,
    });
    onDismiss();
  };

  const onTradeClick = () => {
    onDismiss();
  };

  const metadata = allMarketsStaticData?.spot[productId]?.metadata;

  if (!metadata) {
    return null;
  }

  const marketName = metadata.marketName;
  const symbol = metadata.token.symbol;
  const icon = metadata.token.icon;

  const productTradingLink = get(productTradingLinks, productId, undefined);

  const content = (
    <div className="flex flex-col gap-y-3">
      <p>
        GM! You can now Deposit and use {symbol} as collateral. You can also
        trade {marketName}.
      </p>
      <div className="flex items-center gap-x-2">
        <Image
          className={TOAST_MARKET_ICON_CLASSNAME}
          src={icon.asset}
          alt={symbol}
        />
        <LinkButton
          colorVariant="primary"
          onClick={onDepositClick}
          className="text-text-primary"
        >
          Deposit {symbol}
        </LinkButton>
        {productTradingLink && (
          <LinkButton
            as={Link}
            colorVariant="primary"
            href={productTradingLink.link}
            onClick={onTradeClick}
            className="text-text-primary"
          >
            Trade {marketName}
          </LinkButton>
        )}
      </div>
    </div>
  );

  return (
    <NewFeatureNotification
      title="New Collateral & Spot Market"
      content={content}
      onDismiss={onDismiss}
      {...rest}
    />
  );
}
