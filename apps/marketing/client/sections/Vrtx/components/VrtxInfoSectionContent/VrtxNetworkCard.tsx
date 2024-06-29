import {
  joinClassNames,
  NextImageSrc,
  useCopyText,
  WithChildren,
} from '@vertex-protocol/web-common';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { ButtonProps } from 'client/components/Button/types';
import Image from 'next/image';
import Link from 'next/link';
import { FiCopy } from 'react-icons/fi';
import { MdArrowOutward } from 'react-icons/md';
import { getTruncatedAddress } from 'trade/client/utils/getTruncatedAddress';

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
        <CopyAddressButton address={tokenAddress} />
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
      endIcon={<MdArrowOutward size={24} />}
      as={Link}
      href={href}
      external
      {...rest}
    >
      {children}
    </HomePageButton>
  );
}

function CopyAddressButton({ address }: { address: string }) {
  const { copy, isCopied } = useCopyText();

  return (
    <HomePageButton
      className={joinClassNames(
        'text-white-800 font-dmSans p-2.5 text-sm',
        'flex items-center justify-between',
        'rounded-lg bg-white/5 hover:bg-white/10',
      )}
      endIcon={<FiCopy size={20} className="text-white-700" />}
      title="Copy Token Address"
      onClick={() => copy(address)}
    >
      {isCopied ? 'Copied!' : getTruncatedAddress(address)}
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
