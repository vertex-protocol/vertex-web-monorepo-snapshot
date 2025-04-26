import {
  PresetNumberFormatSpecifier,
  VLP_TOKEN_INFO,
} from '@vertex-protocol/react-client';
import {
  Card,
  Divider,
  LinkButton,
  PrimaryButton,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';
import Image from 'next/image';
import Link from 'next/link';
import { useVlpPositionCard } from 'client/pages/Vlp/components/VlpPositionCard/useVlpPositionCard';

export function VlpPositionCard() {
  const { show } = useDialog();
  const isConnected = useIsConnected();
  const {
    balanceValueUsd,
    balanceAmount,
    shareOfPool,
    totalPnlUsd,
    currentPnlUsd,
  } = useVlpPositionCard();

  return (
    <Card className="flex flex-col gap-y-4 p-4">
      <div className="flex items-start justify-between">
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="Your Position"
          value={balanceValueUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
        <LinkButton
          colorVariant="primary"
          as={Link}
          href={ROUTES.portfolio.history}
          className="text-xs"
        >
          See History
        </LinkButton>
      </div>
      <div className="flex flex-col gap-y-1">
        <ValueWithLabel.Horizontal
          sizeVariant="sm"
          label="Balance"
          value={balanceAmount}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueClassName="items-center"
          valueEndElement={
            <Image
              src={VLP_TOKEN_INFO.icon.asset}
              alt={VLP_TOKEN_INFO.symbol}
              className="h-5 w-auto"
            />
          }
        />
        <ValueWithLabel.Horizontal
          sizeVariant="sm"
          label="Share of Pool"
          value={shareOfPool}
          numberFormatSpecifier={
            PresetNumberFormatSpecifier.PERCENTAGE_UPTO_4DP
          }
        />
      </div>
      <Divider className="mt-auto" />
      <div className="flex flex-col gap-y-1">
        <ValueWithLabel.Horizontal
          sizeVariant="sm"
          label="Total PnL"
          value={totalPnlUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          valueClassName={getSignDependentColorClassName(totalPnlUsd)}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="sm"
          label="Current Position PnL"
          value={currentPnlUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          valueClassName={getSignDependentColorClassName(currentPnlUsd)}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-2">
        <PrimaryButton
          disabled={!isConnected}
          onClick={() => {
            show({
              type: 'provide_vlp_liquidity',
              params: {},
            });
          }}
        >
          Provide
        </PrimaryButton>
        <SecondaryButton
          disabled={!isConnected || !balanceAmount?.gt(0)}
          onClick={() => {
            show({
              type: 'redeem_vlp_liquidity',
              params: {},
            });
          }}
        >
          Redeem
        </SecondaryButton>
      </div>
    </Card>
  );
}
