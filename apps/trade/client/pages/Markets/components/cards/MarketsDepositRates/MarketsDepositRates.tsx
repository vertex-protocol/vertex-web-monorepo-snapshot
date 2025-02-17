import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { MarketsCardContent } from 'client/pages/Markets/components/cards/MarketsCardContent';
import { MarketsCardItemButton } from 'client/pages/Markets/components/cards/MarketsCardItemButton';
import { useMarketsDepositRates } from 'client/pages/Markets/components/cards/MarketsDepositRates/useMarketsDepositRates';
import Image from 'next/image';

export function MarketsDepositRates() {
  const { depositRates, isLoading } = useMarketsDepositRates();
  const { show } = useDialog();

  return (
    <MarketsCardContent title="Top Deposit Rates" isLoading={isLoading}>
      <div
        className={joinClassNames(
          'grid gap-2',
          depositRates && depositRates.length >= 3
            ? 'grid-cols-2'
            : 'grid-cols-1',
        )}
      >
        {depositRates?.map(({ metadata, depositAPR, productId }) => {
          return (
            <MarketsCardItemButton
              onClick={() =>
                show({
                  type: 'deposit',
                  params: { initialProductId: productId },
                })
              }
              key={metadata.token.symbol}
              label={
                <>
                  <Image
                    src={metadata.token.icon.asset}
                    alt={metadata.token.symbol}
                    className="size-4"
                  />
                  {metadata.token.symbol}
                </>
              }
              value={depositAPR}
              valueClassName="text-positive"
              numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
            />
          );
        })}
      </div>
    </MarketsCardContent>
  );
}
