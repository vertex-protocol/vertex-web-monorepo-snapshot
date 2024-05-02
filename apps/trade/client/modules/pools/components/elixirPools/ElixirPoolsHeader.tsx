import { LinkButton } from 'client/components/LinkButton';
import { LINKS } from 'client/modules/brand/links';
import Image from 'next/image';
import Link from 'next/link';
import elixirLogo from '../../assets/elixir-logo.svg';

function ElixirPoolsTitle() {
  return (
    <div className="flex flex-col gap-y-2.5 lg:flex-row lg:items-center lg:gap-x-4">
      <h1 className="text-text-primary text-2xl">Fusion Pools</h1>
      <div className="flex gap-1.5">
        <p className="text-text-tertiary text-xs">Powered by</p>
        <Image src={elixirLogo} alt="elixir" width={70} />
      </div>
    </div>
  );
}

function ElixirPoolsDescription() {
  return (
    <p className="text-text-tertiary text-sm">
      Introducing Fusion Pools - provide liquidity to any orderbook pair and
      earn <span className="text-accent">maker rewards</span> on-top of fees.
      <br />
      Providing Liquidity and managing positions is done on the Elixir App.
    </p>
  );
}

export function ElixirPoolsHeader() {
  return (
    <div className="flex flex-col gap-6 lg:gap-2.5">
      <ElixirPoolsTitle />
      <div className="flex flex-col gap-y-3 lg:flex-row lg:justify-between">
        <ElixirPoolsDescription />
        <LinkButton
          color="white"
          className="w-max text-sm"
          as={Link}
          href={LINKS.elixir}
          external
          withExternalIcon
        >
          See all Fusion Pools
        </LinkButton>
      </div>
    </div>
  );
}
