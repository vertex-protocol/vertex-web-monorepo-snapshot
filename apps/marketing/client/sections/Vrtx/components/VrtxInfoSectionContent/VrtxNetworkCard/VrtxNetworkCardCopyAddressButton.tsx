'use client';

import { Copy } from '@phosphor-icons/react/dist/ssr/Copy';
import {
  joinClassNames,
  truncateMiddle,
  useCopyText,
} from '@vertex-protocol/web-common';
import { HomePageButton } from 'client/components/Button/HomePageButton';

export function VrtxNetworkCardCopyAddressButton({
  address,
}: {
  address: string;
}) {
  const { copy, isCopied } = useCopyText();

  return (
    <HomePageButton
      className={joinClassNames(
        'text-white-800 font-dmSans p-2.5 text-sm',
        'flex items-center justify-between',
        'rounded-lg bg-white/5 hover:bg-white/10',
      )}
      endIcon={<Copy size={20} className="text-white-700" />}
      title="Copy Token Address"
      onClick={() => copy(address)}
    >
      {isCopied ? 'Copied!' : truncateMiddle(address)}
    </HomePageButton>
  );
}
