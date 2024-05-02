import { LinkButton } from 'client/components/LinkButton';
import elixirLogo from 'client/modules/pools/assets/elixir-logo.svg';
import { useElixirLpYields } from 'client/modules/pools/hooks/useElixirLpYields';
import { getElixirProductLink } from 'client/modules/pools/utils/getElixirProductLink';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  productId: number | undefined;
}

export function ElixirEntryPoint({ productId }: Props) {
  const { data: elixirApyData } = useElixirLpYields();

  if (!productId || !elixirApyData?.[productId]) {
    return null;
  }

  const poolApy = elixirApyData[productId];
  const formattedPoolApy = formatNumber(poolApy, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
  });

  return (
    <LinkButton
      color="white"
      as={Link}
      className="hover:bg-overlay-hover/5 w-max gap-x-1 rounded p-2 text-xs no-underline"
      href={getElixirProductLink(productId)}
      external
      withExternalIcon
    >
      <Image src={elixirLogo} alt="elixir" width={42} />
      <div className="flex gap-x-1">
        Supply
        <span className="text-accent">APR: {formattedPoolApy}</span>
      </div>
    </LinkButton>
  );
}
