import { BigDecimal } from '@vertex-protocol/client';
import { NextImageSrc, joinClassNames } from '@vertex-protocol/web-common';
import {
  IconComponent,
  formatTimestamp,
  TimeFormatSpecifier,
  IconButton,
  LinkButton,
} from '@vertex-protocol/web-ui';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { signDependentValue } from '@vertex-protocol/react-client';
import { get } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  productIdForTradingLink?: number;
  marketName: string;
  marketIconSrc: NextImageSrc;
  /**
   * If passed, renders "LONG" / "SHORT" next to the market name.
   */
  amountForSide?: BigDecimal;
  /**
   * If passed, renders the date and time on a second row.
   */
  timeMillis?: number;
  /**
   * If passed, renders an icon button on the right end of the first row.
   */
  iconButtonProps?: {
    icon: IconComponent;
    onClick: () => void;
  };
}

export function MobileTradingTabDataCardHeader({
  productIdForTradingLink,
  marketName,
  marketIconSrc,
  amountForSide,
  timeMillis,
  iconButtonProps,
}: Props) {
  const productTradingLinks = useProductTradingLinks();
  const productTradingLink = productIdForTradingLink
    ? get(productTradingLinks, productIdForTradingLink, undefined)
    : undefined;

  const time = formatTimestamp(timeMillis, {
    formatSpecifier: TimeFormatSpecifier.HH_MM_SS_12H,
  });
  const date = formatTimestamp(timeMillis, {
    formatSpecifier: TimeFormatSpecifier.MONTH_D_YYYY,
  });

  const side = signDependentValue(amountForSide, {
    positive: 'long',
    negative: 'short',
    zero: undefined,
  });

  const marketMeta = (() => {
    const content = (
      <>
        <Image className="size-5" src={marketIconSrc} alt="" />
        <span className="pl-0.5 font-medium">{marketName}</span>
      </>
    );

    if (productTradingLink) {
      return (
        <LinkButton
          withExternalIcon
          as={Link}
          href={productTradingLink.link}
          colorVariant="primary"
          className="text-text-primary no-underline"
        >
          {content}
        </LinkButton>
      );
    }

    return content;
  })();

  return (
    <div className="flex flex-col gap-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-1.5 text-sm">
          {marketMeta}
          {side && (
            <span
              className={joinClassNames(
                'uppercase',
                side === 'long' ? 'text-positive' : 'text-negative',
              )}
            >
              {side}
            </span>
          )}
        </div>
        {iconButtonProps && <IconButton size="xs" {...iconButtonProps} />}
      </div>
      {timeMillis && (
        <span className="text-text-tertiary text-xs">
          {date} {time}
        </span>
      )}
    </div>
  );
}
