import { TabsList, Root as TabsRoot, TabsTrigger } from '@radix-ui/react-tabs';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  Icons,
  LabelTooltip,
  TabTextButton,
  TextButton,
} from '@vertex-protocol/web-ui';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { PlaceOrderPriceType } from 'client/modules/trading/types';
import { useFormContext } from 'react-hook-form';

interface Props {
  /**
   * If true, disables stop market orders
   */
  isIso?: boolean;
}

const ORDER_PRICE_TYPES: PlaceOrderPriceType[] = ['market', 'limit', 'stop'];

const TYPE_TO_LABEL: Record<PlaceOrderPriceType, string> = {
  market: 'Market',
  limit: 'Limit',
  stop: 'Stop Market',
};

export function PriceTypeTabs({ isIso }: Props) {
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
          const isStopMarketDisabled = type === 'stop' && isIso;
          const buttonLabel = TYPE_TO_LABEL[type];
          const buttonContent = (() => {
            if (isStopMarketDisabled) {
              return (
                <LabelTooltip label="Stop Market orders are not available for isolated margin">
                  {buttonLabel}
                </LabelTooltip>
              );
            }

            return buttonLabel;
          })();

          return (
            <TabsTrigger key={type} value={type} asChild>
              <TabTextButton
                // No left padding on first item to align buttons flush with left side of container
                className="px-1 text-xs first:pl-0 sm:px-2"
                active={selectedPriceType === type}
                disabled={isStopMarketDisabled}
              >
                {buttonContent}
              </TabTextButton>
            </TabsTrigger>
          );
        })}
      </TabsList>
      <AppSettingsButton className="ml-auto" />
    </TabsRoot>
  );
}

function AppSettingsButton({ className }: WithClassnames) {
  const { show } = useDialog();
  const isConnected = useIsConnected();

  return (
    <TextButton
      colorVariant="secondary"
      className={joinClassNames(
        'text-text-tertiary rounded-sm p-1.5',
        isConnected && 'hover:bg-surface-2 hover:text-text-secondary',
        className,
      )}
      startIcon={<Icons.GearSix size={12} />}
      onClick={() => {
        show({
          type: 'settings',
          params: {},
        });
      }}
      disabled={!isConnected}
    />
  );
}
