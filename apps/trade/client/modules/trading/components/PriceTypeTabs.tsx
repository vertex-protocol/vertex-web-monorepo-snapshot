import { TabsList, Root as TabsRoot, TabsTrigger } from '@radix-ui/react-tabs';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/react-client';
import { Icons, TabTextButton, TextButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { PlaceOrderPriceType } from 'client/modules/trading/types';
import { useFormContext } from 'react-hook-form';

const ORDER_PRICE_TYPES: PlaceOrderPriceType[] = ['market', 'limit', 'stop'];

const TYPE_TO_LABEL: Record<PlaceOrderPriceType, string> = {
  market: 'Market',
  limit: 'Limit',
  stop: 'Stop Market',
};

function AppSettingsButton({ className }: WithClassnames) {
  const { show } = useDialog();
  const { connectionStatus } = useEVMContext();
  const isConnected = connectionStatus.type === 'connected';

  return (
    <TextButton
      className={joinClassNames(
        'text-text-tertiary rounded p-1.5',
        isConnected && 'hover:bg-surface-2 hover:text-text-secondary',
        className,
      )}
      startIcon={<Icons.BsGear size={12} />}
      onClick={() => {
        show({
          type: 'account_center',
          params: { initialShowSettingsContent: true },
        });
      }}
      disabled={!isConnected}
    />
  );
}

export function PriceTypeTabs() {
  const { setValue, watch } = useFormContext<{
    priceType: PlaceOrderPriceType;
  }>();
  const selectedPriceType = watch('priceType');

  return (
    <TabsRoot
      className="flex items-center"
      value={selectedPriceType}
      onValueChange={(type) =>
        setValue('priceType', type as PlaceOrderPriceType)
      }
    >
      <TabsList className="flex">
        {ORDER_PRICE_TYPES.map((type) => {
          return (
            <TabsTrigger key={type} value={type} asChild>
              <TabTextButton
                // No left padding on first item to align buttons flush with left side of container
                className="px-1 text-xs first:pl-0 sm:px-2"
                active={selectedPriceType === type}
              >
                {TYPE_TO_LABEL[type]}
              </TabTextButton>
            </TabsTrigger>
          );
        })}
      </TabsList>
      <AppSettingsButton className="ml-auto" />
    </TabsRoot>
  );
}
