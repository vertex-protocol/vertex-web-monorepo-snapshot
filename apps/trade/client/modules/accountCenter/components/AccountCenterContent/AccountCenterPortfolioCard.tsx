import * as Popover from '@radix-ui/react-popover';
import {
  PresetNumberFormatSpecifier,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { mergeClassNames } from '@vertex-protocol/web-common';
import {
  Card,
  Icons,
  NavCardButton,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import {
  UseDialog,
  useDialog,
} from 'client/modules/app/dialogs/hooks/useDialog';
import { IMAGES } from 'common/brandMetadata/images';
import {
  ARB_CHAIN_IDS,
  BLAST_CHAIN_IDS,
  MANTLE_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import Image from 'next/image';

/**
 * Card with portfolio value and collateral buttons
 */
export function AccountCenterPortfolioCard() {
  const { show } = useDialog();

  const { data: derivedSubaccountOverview } = useDerivedSubaccountOverview();

  const { connectionStatus } = useEVMContext();
  const isConnected = connectionStatus.type === 'connected';
  const userActionState = useUserActionState();

  const isBridgeSupported = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
    ...BLAST_CHAIN_IDS,
  ]);
  const isBuySupported = useIsEnabledForChainIds([
    ...ARB_CHAIN_IDS,
    ...MANTLE_CHAIN_IDS,
  ]);

  const enableDeposit = userActionState !== 'block_all';
  const enableWithdraw = userActionState === 'allow_all';
  const enableBridge = isBridgeSupported && isConnected;
  const enableBuy = isBuySupported && isConnected;

  return (
    <div className="border-stroke relative flex flex-col gap-y-6 overflow-hidden rounded-lg border p-4">
      <ValueWithLabel.Vertical
        label="Account Value"
        value={derivedSubaccountOverview?.portfolioValueUsd}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        sizeVariant="lg"
      />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <SecondaryButton
          onClick={() => {
            show({
              type: 'deposit',
              params: {},
            });
          }}
          disabled={!enableDeposit}
        >
          Deposit
        </SecondaryButton>
        <SecondaryButton
          onClick={() => {
            show({
              type: 'withdraw',
              params: {},
            });
          }}
          disabled={!enableWithdraw}
        >
          Withdraw
        </SecondaryButton>
        <BridgeBuyPopover
          enableBridge={enableBridge}
          enableBuy={enableBuy}
          show={show}
        />
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

interface BridgeBuyPopoverProps {
  enableBridge: boolean;
  enableBuy: boolean;
  show: UseDialog['show'];
}

function BridgeBuyPopover({
  enableBridge,
  enableBuy,
  show,
}: BridgeBuyPopoverProps) {
  const disablePopover = !enableBuy && !enableBridge;

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <SecondaryButton disabled={disablePopover}>Bridge/Buy</SecondaryButton>
      </Popover.Trigger>
      <Popover.Content sideOffset={10} align="end" asChild>
        <Card
          className={mergeClassNames(
            'bg-surface-2 z-10 flex flex-col',
            'max-w-[270px] gap-y-2 p-1.5',
          )}
        >
          <NavCardButton
            title="Bridge"
            description="Deposit from 8+ chains"
            icon={Icons.PiShuffleSimple}
            disabled={!enableBridge}
            onClick={() => {
              show({
                type: 'bridge',
                params: {},
              });
            }}
          />
          <NavCardButton
            title="Buy Crypto"
            description="Purchase with fiat"
            icon={Icons.PiCurrencyCircleDollarBold}
            disabled={!enableBuy}
            onClick={() => {
              show({
                type: 'transak_onramp_notice',
                params: {},
              });
            }}
          />
        </Card>
      </Popover.Content>
    </Popover.Root>
  );
}
