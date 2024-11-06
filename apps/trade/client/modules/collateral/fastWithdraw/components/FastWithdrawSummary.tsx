import { BigDecimal } from '@vertex-protocol/client';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { imageToIconComponent } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { SpotProductMetadata } from '@vertex-protocol/metadata';
import { useMemo } from 'react';

interface Props {
  metadata: SpotProductMetadata;
  withdrawalSize: BigDecimal | undefined;
  withdrawalFeeAmount: BigDecimal | undefined;
}

export function FastWithdrawSummary({
  metadata,
  withdrawalSize,
  withdrawalFeeAmount,
}: Props) {
  const AssetIcon = useMemo(
    () =>
      imageToIconComponent({
        src: metadata.token.icon.asset,
        alt: metadata.token.symbol,
      }),
    [metadata],
  );

  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-text-primary text-sm">Pending Withdrawal</p>
      <div className="flex flex-col gap-y-3">
        <ValueWithLabel.Horizontal
          sizeVariant="sm"
          labelClassName="text-text-primary"
          sizeVariantOverrides={{
            label: 'lg',
          }}
          labelStartIcon={AssetIcon}
          label={metadata.token.symbol}
          value={withdrawalSize}
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
          valueEndElement={metadata.token.symbol}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Fast Withdrawal Fee"
          value={withdrawalFeeAmount}
          tooltip={{
            id: 'fastWithdrawalFee',
          }}
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_PRECISE}
          valueEndElement={metadata.token.symbol}
        />
      </div>
    </div>
  );
}
