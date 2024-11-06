import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { TokenPairIcons } from 'client/components/TokenPairIcons';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { PairMetadata } from 'client/modules/pools/types';

interface Props {
  productId: number;
  metadata: PairMetadata;
  yieldFraction: BigDecimal | undefined;
  marketName: string;
}

export function BlitzPoolOpportunityItem({
  productId,
  marketName,
  metadata,
  yieldFraction,
}: Props) {
  const showDialogForProduct = useShowDialogForProduct();

  return (
    <div className="flex items-center gap-x-3 text-xs">
      <TokenPairIcons
        first={{
          src: metadata.base.icon.asset,
          alt: metadata.base.symbol,
        }}
        second={{
          src: metadata.quote.icon.asset,
          alt: metadata.quote.symbol,
        }}
        size={24}
      />
      <LinkButton
        colorVariant="primary"
        onClick={() =>
          showDialogForProduct({
            dialogType: 'provide_liquidity',
            productId,
          })
        }
      >
        {marketName}
      </LinkButton>
      <div className="ml-auto">
        <span className="text-positive">
          {formatNumber(yieldFraction, {
            formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
          })}{' '}
          APR
        </span>{' '}
        + <span className="text-accent-blast">GOLD</span>
      </div>
    </div>
  );
}
