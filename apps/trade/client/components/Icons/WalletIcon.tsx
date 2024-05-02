import { getUniqueImageForAddress } from 'client/utils/getUniqueImageForAddress';
import { ZeroAddress } from 'ethers';
import Image from 'next/image';

interface Props {
  width?: number;
  height?: number;
  address: string | undefined;
}

export function WalletIcon({ width = 22, height = 22, address }: Props) {
  return (
    <Image
      className="rounded-full"
      src={`data:image/svg+xml;base64,${getUniqueImageForAddress(
        address ?? ZeroAddress,
      )}`}
      width={width}
      height={height}
      alt="Address Image"
    />
  );
}
