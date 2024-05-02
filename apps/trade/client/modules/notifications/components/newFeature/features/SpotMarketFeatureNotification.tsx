import { LinkButton } from 'client/components/LinkButton';
import { ToastProps } from 'client/components/Toast/types';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { NewFeatureDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { TOAST_MARKET_ICON_CLASSNAME } from 'client/modules/notifications/components/consts';
import { NewFeatureNotification } from 'client/modules/notifications/components/newFeature/NewFeatureNotification';
import { SpotProductMetadata } from 'common/productMetadata/types';
import Image from 'next/image';

interface Props extends ToastProps {
  disclosureKey: NewFeatureDisclosureKey;
  metadata: SpotProductMetadata;
  productId: number;
}

export function SpotMarketFeatureNotification({
  disclosureKey,
  metadata,
  productId,
  onDismiss: baseOnDismiss,
  ...rest
}: Props) {
  const showDialogForProduct = useShowDialogForProduct();
  const pushTradePage = usePushTradePage();

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
    pushTradePage({ productId });
    onDismiss();
  };

  const marketName = metadata.marketName;
  const symbol = metadata.token.symbol;
  const icon = metadata.token.icon;

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
          color="white"
          onClick={onDepositClick}
          className="text-text-primary"
        >
          Deposit {symbol}
        </LinkButton>
        <LinkButton
          color="white"
          onClick={onTradeClick}
          className="text-text-primary"
        >
          Trade {marketName}
        </LinkButton>
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
