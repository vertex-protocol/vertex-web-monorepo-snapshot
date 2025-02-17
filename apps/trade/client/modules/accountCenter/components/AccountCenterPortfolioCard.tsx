import { WalletWidget } from '@passkeys/react';
import { KNOWN_CONNECTOR_IDS, PresetNumberFormatSpecifier, useEVMContext, } from '@vertex-protocol/react-client';
import { Card, SecondaryButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositOptionsDropdown } from 'client/modules/collateral/deposit/components/DepositOptionsDropdown/DepositOptionsDropdown';
import { IMAGES } from 'common/brandMetadata/images';
import { COLORS } from 'common/theme/colors';
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
          sizeVariant="lg"
        />
        {connector?.id === KNOWN_CONNECTOR_IDS.passKeys && (
          <ValueWithLabel.Vertical
            label="Passkey Wallet"
            valueContent={
              <WalletWidget
                experimental_mode="modal"
                size="medium"
                theme={{
                  colors: {
                    accentColor: COLORS.primary.DEFAULT,
                    collapsed: {
                      accentColor: COLORS.primary.DEFAULT,
                      backgroundColor: COLORS.surface.card,
                    },
                  },
                }}
              />
            }
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <DepositOptionsDropdown triggerClassName="col-span-2" />
        <SecondaryButton
          onClick={() => {
            push({
              type: 'withdraw',
              params: {},
            });
          }}
          disabled={!isConnected}
        >
          Withdraw
        </SecondaryButton>
        <SecondaryButton
          onClick={() => {
            push({
              type: 'subaccount_quote_transfer',
              params: {},
            });
          }}
          disabled={!isConnected}
        >
          Transfer
        </SecondaryButton>
      </div>
    </Card>
  );
}
