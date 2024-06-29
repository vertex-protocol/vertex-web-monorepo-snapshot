import { joinClassNames } from '@vertex-protocol/web-common';
import {
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { getStateOverlayClassNames } from '@vertex-protocol/web-ui';
import { LinkButton } from 'client/components/LinkButton';
import elixirLogo from 'client/modules/pools/assets/elixir-logo.svg';
import { useElixirLpYields } from 'client/modules/pools/hooks/useElixirLpYields';
import { getElixirProductLink } from 'client/modules/pools/utils/getElixirProductLink';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  productId: number | undefined;
  onClick?: () => void;
}

export function ElixirEntryPoint({ productId, onClick }: Props) {
  const { data: elixirApyData } = useElixirLpYields();

  if (!productId || !elixirApyData?.[productId]) {
    return null;
  }

  const poolApy = elixirApyData[productId];
  const formattedPoolApy = formatNumber(poolApy, {
    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
  });

  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
  });

  return (
    <LinkButton
      colorVariant="primary"
      as={Link}
      className={joinClassNames(
        'w-max gap-x-1 rounded p-2 text-xs no-underline',
        hoverStateOverlayClassNames,
      )}
      href={getElixirProductLink(productId)}
      external
      withExternalIcon
      onClick={onClick}
    >
      <Image src={elixirLogo} alt="elixir" width={42} />
      <div className="flex gap-x-1">
        Supply
        <span className="text-accent">APR: {formattedPoolApy}</span>
      </div>
    </LinkButton>
  );
}
