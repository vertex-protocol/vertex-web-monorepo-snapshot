import { WalletWidget } from '@passkeys/react';
import {
  KNOWN_CONNECTOR_IDS,
  PresetNumberFormatSpecifier,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { Card, CardButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositEntrypointButton } from 'client/modules/collateral/deposit/components/DepositEntrypointButton/DepositEntrypointButton';
import { getTradeAppColorVar } from 'client/modules/theme/colorVars';
import { IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';

/**
 * Card with portfolio value and collateral buttons
 */
export function AccountCenterPortfolioCard() {
  const { push } = useDialog();

  const { data: subaccountOverview } = useSubaccountOverview();
  const {
    connectionStatus: { connector },
  } = useEVMContext();

  const isConnected = useIsConnected();

  return (
    <Card className="bg-background relative flex flex-col gap-y-4 overflow-hidden border-4 p-4">
      <Image
        src={IMAGES.brandBg}
        alt=""
        fill
        sizes="95vw"
        className="object-cover"
        priority
      />
      {/*isolate needed here to display content over the bg image*/}
      <div className="isolate flex justify-between">
        <ValueWithLabel.Vertical
          label="Account Value"
          value={subaccountOverview?.portfolioValueUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          sizeVariant="xl"
        />
        {connector?.id === KNOWN_CONNECTOR_IDS.passKeys && (
          <ValueWithLabel.Vertical
            sizeVariant="lg"
            label="Passkey Wallet"
            valueContent={
              <WalletWidget
                experimental_mode="modal"
                size="medium"
                theme={{
                  colors: {
                    accentColor: getTradeAppColorVar('primary'),
                    collapsed: {
                      accentColor: getTradeAppColorVar('primary'),
                      backgroundColor: getTradeAppColorVar('surface-card'),
                    },
                  },
                }}
              />
            }
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <DepositEntrypointButton triggerClassName="col-span-2" />
        <CardButton
          onClick={() => {
            push({
              type: 'withdraw',
              params: {},
            });
          }}
          disabled={!isConnected}
        >
          Withdraw
        </CardButton>
        <CardButton
          onClick={() => {
            push({
              type: 'subaccount_quote_transfer',
              params: {},
            });
          }}
          disabled={!isConnected}
        >
          Transfer
        </CardButton>
      </div>
    </Card>
  );
}
