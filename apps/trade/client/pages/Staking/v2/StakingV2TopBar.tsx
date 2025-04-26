import { BigDecimal } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  joinClassNames,
  NextImageSrc,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { useSwitchToProtocolTokenChainEnv } from 'client/hooks/util/useSwitchToProtocolTokenChainEnv';
import { useVrtxMarketMetrics } from 'client/modules/staking/hooks/useVrtxMarketMetrics';
import { signDependentValue } from '@vertex-protocol/react-client';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  stakingApy: BigDecimal | undefined;
  totalStaked: BigDecimal | undefined;
  liquidSupplyFraction: BigDecimal | undefined;
  usdcFeesRedirected: BigDecimal | undefined;
}

export function StakingV2TopBar({
  usdcFeesRedirected,
  liquidSupplyFraction,
  stakingApy,
  totalStaked,
}: Props) {
  const {
    protocolTokenMetadata: {
      token: {
        symbol: protocolTokenSymbol,
        icon: { asset: protocolTokenIconSrc },
      },
      productId: protocolTokenProductId,
    },
    primaryQuoteToken: { symbol: primaryQuoteTokenSymbol },
  } = useVertexMetadataContext();
  const productTradingLinks = useProductTradingLinks();
  const { isOnProtocolTokenChainEnv } = useSwitchToProtocolTokenChainEnv();

  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-4',
        'lg:flex-row lg:items-center lg:justify-between',
      )}
    >
      <div className="grid grid-cols-2 items-center gap-x-6 gap-y-4 lg:flex">
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          tooltip={{ id: 'stakingV2StakingApr' }}
          label="Staking APR"
          valueClassName="text-positive"
          value={stakingApy}
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          tooltip={{ id: 'stakingV2TotalStaked' }}
          label="Total Staked"
          value={totalStaked}
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
          }
          valueEndElement={protocolTokenSymbol}
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="% of Circ. Supply"
          value={liquidSupplyFraction}
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          tooltip={{ id: 'stakingV2FeesRedirected' }}
          label="7d Fees Redirected"
          value={usdcFeesRedirected}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
          valueEndElement={primaryQuoteTokenSymbol}
        />
      </div>
      <div
        className={joinClassNames(
          'grid grid-cols-2 items-center gap-x-4',
          // On large screens, we want the price item to float right when not on correct chain
          // This is due to the "Buy" button being conditionally rendered
          'lg:grid-flow-col lg:grid-cols-1',
        )}
      >
        <PriceItem protocolTokenIconSrc={protocolTokenIconSrc} />
        {isOnProtocolTokenChainEnv && (
          <SecondaryButton
            size="sm"
            as={Link}
            href={productTradingLinks?.[protocolTokenProductId]?.link ?? ''}
          >
            Buy {protocolTokenSymbol}
          </SecondaryButton>
        )}
      </div>
    </div>
  );
}

function PriceItem({
  protocolTokenIconSrc,
  className,
}: WithClassnames<{
  protocolTokenIconSrc: NextImageSrc;
}>) {
  const {
    oraclePrice,
    pastDayOraclePriceChangeFrac,
    marketPriceFormatSpecifier,
  } = useVrtxMarketMetrics();

  const valueColorClassName = signDependentValue(pastDayOraclePriceChangeFrac, {
    positive: 'text-positive',
    negative: 'text-negative',
    zero: 'text-text-tertiary',
  });

  const content = (
    <div className="flex items-center gap-x-2">
      <Image src={protocolTokenIconSrc} alt="VRTX" className="size-4" />
      <span className="text-text-primary text-xl">
        {formatNumber(oraclePrice, {
          formatSpecifier: marketPriceFormatSpecifier,
        })}
      </span>
      <span
        className={joinClassNames(
          'flex items-center gap-x-0.5 text-xs',
          valueColorClassName,
        )}
      >
        {signDependentValue(pastDayOraclePriceChangeFrac, {
          positive: <Icons.ArrowUp size={14} />,
          negative: <Icons.ArrowDown size={14} />,
          zero: null,
        })}{' '}
        {formatNumber(pastDayOraclePriceChangeFrac?.abs(), {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        })}
      </span>
    </div>
  );

  return (
    <ValueWithLabel.Vertical
      sizeVariant="lg"
      label="Price / 24h Change"
      valueContent={content}
      className={className}
    />
  );
}
