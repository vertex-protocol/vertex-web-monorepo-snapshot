import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr/ArrowUpRight';
import {
  joinClassNames,
  NextImageSrc,
  WithChildren,
} from '@vertex-protocol/web-common';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { ButtonProps } from 'client/components/Button/types';
import { VrtxNetworkCardCopyAddressButton } from 'client/sections/Vrtx/components/VrtxInfoSectionContent/VrtxNetworkCard/VrtxNetworkCardCopyAddressButton';
import Image from 'next/image';
import Link from 'next/link';

export type VrtxLinkProps = Exclude<ButtonProps<typeof Link>, 'as'>;

export interface NetworkMetadata {
  chainName: string;
  chainExplorerName: string;
  chainExplorerUrl: string;
  tokenAddress: string;
  chainIcon: {
    src: NextImageSrc;
    bgClassName?: string;
  };
}

export function VrtxNetworkCard({
  chainExplorerName,
  chainExplorerUrl,
  chainIcon,
  tokenAddress,
  chainName,
}: NetworkMetadata) {
  return (
    <div className="flex flex-col items-start gap-y-4 lg:gap-y-5">
      <div className="flex w-full flex-col gap-y-2.5">
        <NetworkNameItem
          imgSrc={chainIcon.src}
          imgClassName={chainIcon.bgClassName}
        >
          {chainName}
        </NetworkNameItem>
        <VrtxNetworkCardCopyAddressButton address={tokenAddress} />
      </div>
      <ExternalLinkButton as={Link} href={chainExplorerUrl}>
        {chainExplorerName}
      </ExternalLinkButton>
    </div>
  );
}

function ExternalLinkButton({
  children,
  href,
  className,
  ...rest
}: VrtxLinkProps) {
  return (
    <HomePageButton
      className={joinClassNames(
        'flex items-center justify-start py-2 font-bold',
        'text-white hover:text-purple-700',
        className,
      )}
      endIcon={<ArrowUpRight size={20} />}
      as={Link}
      href={href}
      external
      {...rest}
    >
      {children}
    </HomePageButton>
  );
}

interface NetworkNameItemProps extends WithChildren {
  imgSrc: NextImageSrc;
  imgClassName?: string;
}

function NetworkNameItem({
  children,
  imgSrc,
  imgClassName,
}: NetworkNameItemProps) {
  return (
    <div className="flex items-center gap-x-1.5">
      <Image
        src={imgSrc}
        alt="Network logo"
        className={joinClassNames('w-7 rounded-md p-1', imgClassName)}
      />
      {children}
    </div>
  );
}
