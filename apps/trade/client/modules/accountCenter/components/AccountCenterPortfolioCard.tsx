import { WalletWidget } from '@passkeys/react';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useEVMContext } from '@vertex-protocol/react-client';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DepositOptionsDropdown } from 'client/modules/collateral/deposit/components/DepositOptionsDropdown/DepositOptionsDropdown';
import { IMAGES } from 'common/brandMetadata/images';
import { COLORS } from 'common/theme/colors';
import Image from 'next/image';
import { KNOWN_CONNECTOR_IDS } from 'client/consts/knownConnectorIds';

/**
 * Card with portfolio value and collateral buttons
 */
export function AccountCenterPortfolioCard() {
  const { push } = useDialog();

  const { data: derivedSubaccountOverview } = useDerivedSubaccountOverview();
  const {
    connectionStatus: { connector },
  } = useEVMContext();

  const isConnected = useIsConnected();

  return (
    <div className="border-stroke relative flex flex-col gap-y-4 overflow-hidden rounded-lg border p-4">
      <div className="flex justify-between">
        <ValueWithLabel.Vertical
          label="Account Value"
          value={derivedSubaccountOverview?.portfolioValueUsd}
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
      <Image
        src={IMAGES.brandBg}
        alt=""
        fill
        className="-z-10 object-cover"
        priority
      />
    </div>
  );
}
