'use client';
import {
  mergeClassNames,
  NextImageSrc,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { IconButton, Icons } from '@vertex-protocol/web-ui';
import { SizeClass, useSizeClass } from 'client/hooks/ui/breakpoints';

import abstractDesktopBannerBg from 'client/modules/app/components/banners/AppBanner/assets/abstract-desktop-banner-bg.png';
import abstractMobileBannerBg from 'client/modules/app/components/banners/AppBanner/assets/abstract-mobile-banner-bg.png';
import arbDesktopBannerBg from 'client/modules/app/components/banners/AppBanner/assets/arb-desktop-banner-bg.png';
import arbMobileBannerBg from 'client/modules/app/components/banners/AppBanner/assets/arb-mobile-banner-bg.png';
import avaxDesktopBannerBg from 'client/modules/app/components/banners/AppBanner/assets/avax-desktop-banner-bg.png';
import avaxMobileBannerBg from 'client/modules/app/components/banners/AppBanner/assets/avax-mobile-banner-bg.png';
import baseDesktopBannerBg from 'client/modules/app/components/banners/AppBanner/assets/base-desktop-banner-bg.png';
import baseMobileBannerBg from 'client/modules/app/components/banners/AppBanner/assets/base-mobile-banner-bg.png';
import blitzDesktopBannerBg from 'client/modules/app/components/banners/AppBanner/assets/blitz-desktop-banner-bg.png';
import blitzMobileBannerBg from 'client/modules/app/components/banners/AppBanner/assets/blitz-mobile-banner-bg.png';
import mantleDesktopBannerBg from 'client/modules/app/components/banners/AppBanner/assets/mantle-desktop-banner-bg.png';
import mantleMobileBannerBg from 'client/modules/app/components/banners/AppBanner/assets/mantle-mobile-banner-bg.png';
import seiDesktopBannerBg from 'client/modules/app/components/banners/AppBanner/assets/sei-desktop-banner-bg.png';
import seiMobileBannerBg from 'client/modules/app/components/banners/AppBanner/assets/sei-mobile-banner-bg.png';
import sonicDesktopBannerBg from 'client/modules/app/components/banners/AppBanner/assets/sonic-desktop-banner-bg.png';
import sonicMobileBannerBg from 'client/modules/app/components/banners/AppBanner/assets/sonic-mobile-banner-bg.png';
import vertexDesktopBannerBg from 'client/modules/app/components/banners/AppBanner/assets/vertex-desktop-banner-bg.png';
import vertexMobileBannerBg from 'client/modules/app/components/banners/AppBanner/assets/vertex-mobile-banner-bg.png';
import { VERTEX_SPECIFIC_IMAGES } from 'common/brandMetadata/images';

import Image from 'next/image';

type AppBannerVariant =
  | 'vertex'
  | 'blitz'
  | 'sei'
  | 'arb'
  | 'base'
  | 'mantle'
  | 'sonic'
  | 'abstract'
  | 'avax';

export interface AppBannerProps extends WithClassnames, WithChildren {
  variant: AppBannerVariant;

  /**
   * If not set, no close button is rendered
   */
  onDismiss?: () => void;
}

const BG_IMAGE_SRC_BY_VARIANT_BY_SIZE_CLASS: Record<
  SizeClass,
  Record<AppBannerVariant, NextImageSrc | undefined>
> = {
  desktop: {
    vertex: vertexDesktopBannerBg,
    blitz: blitzDesktopBannerBg,
    sei: seiDesktopBannerBg,
    arb: arbDesktopBannerBg,
    base: baseDesktopBannerBg,
    mantle: mantleDesktopBannerBg,
    sonic: sonicDesktopBannerBg,
    abstract: abstractDesktopBannerBg,
    avax: avaxDesktopBannerBg,
  },
  tablet: {
    vertex: vertexDesktopBannerBg,
    blitz: blitzDesktopBannerBg,
    sei: seiDesktopBannerBg,
    arb: arbDesktopBannerBg,
    base: baseDesktopBannerBg,
    mantle: mantleDesktopBannerBg,
    sonic: sonicDesktopBannerBg,
    abstract: abstractDesktopBannerBg,
    avax: avaxDesktopBannerBg,
  },
  mobile: {
    vertex: vertexMobileBannerBg,
    blitz: blitzMobileBannerBg,
    sei: seiMobileBannerBg,
    arb: arbMobileBannerBg,
    base: baseMobileBannerBg,
    mantle: mantleMobileBannerBg,
    sonic: sonicMobileBannerBg,
    abstract: abstractMobileBannerBg,
    avax: avaxMobileBannerBg,
  },
};

export function AppBanner({
  className,
  onDismiss,
  children,
  variant,
}: AppBannerProps) {
  const sizeClass = useSizeClass();

  const bgImageSrc =
    BG_IMAGE_SRC_BY_VARIANT_BY_SIZE_CLASS[sizeClass.value][variant];

  const isVertexVariant = variant === 'vertex';

  return (
    <div
      className={mergeClassNames(
        'relative flex overflow-hidden px-4 py-4 sm:px-12 sm:py-5',
        'flex-col items-center justify-center gap-1 sm:flex-row',
        'text-xs',
        className,
      )}
    >
      {children}
      {isVertexVariant && (
        <Image
          src={VERTEX_SPECIFIC_IMAGES.vertex3dLogo}
          alt=""
          className="absolute bottom-1 left-[5%] -z-1 h-full w-auto sm:left-[25%] lg:left-[30%]"
        />
      )}
      {bgImageSrc && (
        <Image
          className="absolute right-0 left-0 -z-10 h-full w-full"
          src={bgImageSrc}
          priority
          quality={100}
          alt=""
        />
      )}
      {onDismiss && (
        <IconButton
          icon={Icons.X}
          size="xs"
          onClick={onDismiss}
          className="absolute top-1/2 right-4 -translate-y-1/2"
        />
      )}
    </div>
  );
}
