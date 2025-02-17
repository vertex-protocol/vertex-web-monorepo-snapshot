'use client';

import {
  mergeClassNames,
  NextImageSrc,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { IconButton, Icons } from '@vertex-protocol/web-ui';
import { SizeClass, useSizeClass } from 'client/hooks/ui/breakpoints';

import abstractDesktopBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/abstract-desktop-banner-bg.png';
import abstractMobileBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/abstract-mobile-banner-bg.png';
import arbDesktopBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/arb-desktop-banner-bg.png';
import arbMobileBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/arb-mobile-banner-bg.png';
import baseDesktopBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/base-desktop-banner-bg.png';
import baseMobileBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/base-mobile-banner-bg.png';
import mantleDesktopBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/mantle-desktop-banner-bg.png';
import mantleMobileBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/mantle-mobile-banner-bg.png';
import seiDesktopBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/sei-desktop-banner-bg.png';
import seiMobileBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/sei-mobile-banner-bg.png';
import sonicDesktopBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/sonic-desktop-banner-bg.png';
import sonicMobileBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/sonic-mobile-banner-bg.png';
import vertexDesktopBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/vertex-desktop-banner-bg.png';
import vertexMobileBannerBg from 'client/modules/app/components/banners/AppPromoBanner/assets/vertex-mobile-banner-bg.png';
import { PromoBannerDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import Image from 'next/image';

type AppBannerVariant =
  | 'vertex'
  | 'blitz'
  | 'sei'
  | 'arb'
  | 'base'
  | 'mantle'
  | 'sonic'
  | 'abstract';

interface Props extends WithClassnames, WithChildren {
  disclosureKey: PromoBannerDisclosureKey;
  variant: AppBannerVariant;
}

const BG_IMAGE_SRC_BY_VARIANT_BY_SIZE_CLASS: Record<
  SizeClass,
  Record<AppBannerVariant, NextImageSrc | undefined>
> = {
  desktop: {
    vertex: vertexDesktopBannerBg,
    blitz: undefined,
    sei: seiDesktopBannerBg,
    arb: arbDesktopBannerBg,
    base: baseDesktopBannerBg,
    mantle: mantleDesktopBannerBg,
    sonic: sonicDesktopBannerBg,
    abstract: abstractDesktopBannerBg,
  },
  tablet: {
    vertex: vertexDesktopBannerBg,
    blitz: undefined,
    sei: seiDesktopBannerBg,
    arb: arbDesktopBannerBg,
    base: baseDesktopBannerBg,
    mantle: mantleDesktopBannerBg,
    sonic: sonicDesktopBannerBg,
    abstract: abstractDesktopBannerBg,
  },
  mobile: {
    vertex: vertexMobileBannerBg,
    blitz: undefined,
    sei: seiMobileBannerBg,
    arb: arbMobileBannerBg,
    base: baseMobileBannerBg,
    mantle: mantleMobileBannerBg,
    sonic: sonicMobileBannerBg,
    abstract: abstractMobileBannerBg,
  },
};

export function AppPromoBanner({
  className,
  children,
  disclosureKey,
  variant,
}: Props) {
  const sizeClass = useSizeClass();
  const { shouldShow, dismiss } = useShowUserDisclosure(disclosureKey);

  if (!shouldShow) {
    return null;
  }

  const bgImageSrc =
    BG_IMAGE_SRC_BY_VARIANT_BY_SIZE_CLASS[sizeClass.value][variant];

  return (
    <div
      className={mergeClassNames(
        'relative flex overflow-hidden px-4 py-3 sm:px-12 sm:py-5',
        'flex-col items-center justify-center gap-1 sm:flex-row',
        'text-xs',
        className,
      )}
    >
      {children}
      {bgImageSrc && (
        <Image
          className="absolute left-0 right-0 -z-10 h-full w-full"
          src={bgImageSrc}
          priority
          quality={100}
          alt=""
        />
      )}
      <IconButton
        icon={Icons.X}
        size="xs"
        onClick={dismiss}
        className="absolute right-4 top-4"
      />
    </div>
  );
}
