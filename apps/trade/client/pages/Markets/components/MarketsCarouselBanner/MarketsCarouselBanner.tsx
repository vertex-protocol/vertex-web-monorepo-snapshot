'use client';

import { joinClassNames, NextImageSrc } from '@vertex-protocol/web-common';
import { LinkButton } from '@vertex-protocol/web-ui';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import {
  COMMON_SWIPER_CLASSNAME,
  COMMON_SWIPER_PROPS,
} from 'client/pages/Markets/components/consts';
import { SwiperNavigation } from 'client/pages/Markets/components/SwiperNavigation';
import { clientEnv } from 'common/environment/clientEnv';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import desktopAbstractLaunchBg from 'client/pages/Markets/components/MarketsCarouselBanner/assets/abstract-launch-banner-bg.png';
import mobileAbstractLaunchBg from 'client/pages/Markets/components/MarketsCarouselBanner/assets/abstract-mobile-launch-banner-bg.png';
import blitzMultipleAccountBg from 'client/pages/Markets/components/MarketsCarouselBanner/assets/blitz-multiple-accounts-bg.png';
import blitzRewardsBg from 'client/pages/Markets/components/MarketsCarouselBanner/assets/blitz-trading-rewards-bg.png';
import blitzWatchlistBg from 'client/pages/Markets/components/MarketsCarouselBanner/assets/blitz-watchlist-bg.png';
import mobileBlitzBg from 'client/pages/Markets/components/MarketsCarouselBanner/assets/mobile-blitz-banner-bg.png';
import mobileVertexBg from 'client/pages/Markets/components/MarketsCarouselBanner/assets/mobile-vertex-banner-bg.png';
import vertexMultipleAccountBg from 'client/pages/Markets/components/MarketsCarouselBanner/assets/vertex-multiple-accounts-bg.png';
import vertexRewardsBg from 'client/pages/Markets/components/MarketsCarouselBanner/assets/vertex-trading-rewards-bg.png';
import vertexWatchlistBg from 'client/pages/Markets/components/MarketsCarouselBanner/assets/vertex-watchlist-bg.png';

export function MarketsCarouselBanner() {
  const banners = useMarketsCarouselBanner();

  const defaultMobileBrandBg =
    clientEnv.base.brandName === 'vertex' ? mobileVertexBg : mobileBlitzBg;

  return (
    <Swiper
      {...COMMON_SWIPER_PROPS}
      autoplay={{ delay: 7000 }}
      className={joinClassNames(
        'bg-background h-40 border-2',
        'lg:h-52 lg:border-4',
        COMMON_SWIPER_CLASSNAME,
      )}
    >
      {banners.map(
        ({ desktopBgImgSrc, mobileBgImgSrc, description, title }, index) => {
          return (
            <SwiperSlide
              key={index}
              className="flex overflow-hidden rounded-lg p-6 lg:px-28"
            >
              {/* Mobile Background */}
              <Image
                src={mobileBgImgSrc ?? defaultMobileBrandBg}
                alt=""
                fill
                priority
                sizes="95vw"
                quality={100}
                className="-z-10 object-cover sm:hidden"
              />
              {/* Desktop Background */}
              <Image
                src={desktopBgImgSrc}
                alt=""
                fill
                priority
                sizes="100vw"
                quality={100}
                className="-z-10 hidden object-cover sm:block"
              />
              <div className="flex h-full flex-col gap-y-3 lg:justify-center">
                <div className="text-text-primary text-lg lg:text-3xl">
                  {title}
                </div>
                <div className="text-text-secondary text-xs lg:text-sm">
                  {description}
                </div>
              </div>
            </SwiperSlide>
          );
        },
      )}
      <SwiperNavigation fullWidthOnDesktop />
    </Swiper>
  );
}

interface BannerConfig {
  title: ReactNode;
  description: ReactNode;
  desktopBgImgSrc: NextImageSrc;
  mobileBgImgSrc?: NextImageSrc;
}

function useMarketsCarouselBanner() {
  const { show } = useDialog();
  const isConnected = useIsConnected();

  const isVertex = clientEnv.base.brandName === 'vertex';

  return useMemo((): BannerConfig[] => {
    const abstractBanner: BannerConfig = {
      title: 'Abstract Launch',
      description: (
        <>
          <p>
            Vertex Edge launches 7th Chain -{' '}
            <span className="text-text-primary font-bold">Abstract</span>.
          </p>
          <p>Switch chains and trade now!</p>
        </>
      ),
      desktopBgImgSrc: desktopAbstractLaunchBg,
      mobileBgImgSrc: mobileAbstractLaunchBg,
    };

    return [
      ...(isVertex ? [abstractBanner] : []),
      {
        title: 'Trading Rewards',
        ...(isVertex
          ? {
              description: (
                <>
                  Rewards are earned per epoch based on your trading activity.{' '}
                  <LinkButton
                    as={Link}
                    colorVariant="accent"
                    href={ROUTES.rewards}
                  >
                    Go to Rewards
                  </LinkButton>
                </>
              ),
              desktopBgImgSrc: vertexRewardsBg,
              mobileBgImgSrc: mobileVertexBg,
            }
          : {
              description: (
                <>
                  Earn points and gold by trading and referring others.{' '}
                  <LinkButton
                    as={Link}
                    colorVariant="accent"
                    href={ROUTES.rewards}
                  >
                    Go to Rewards
                  </LinkButton>
                </>
              ),
              desktopBgImgSrc: blitzRewardsBg,
              mobileBgImgSrc: mobileBlitzBg,
            }),
      },
      {
        title: 'Watchlist',
        description: (
          <>
            Keep track of your favorite markets and keep them within easy
            access.{' '}
            <LinkButton
              as={Link}
              colorVariant="accent"
              href={ROUTES.perpTrading}
            >
              Start Trading
            </LinkButton>
          </>
        ),
        desktopBgImgSrc: isVertex ? vertexWatchlistBg : blitzWatchlistBg,
      },
      {
        title: 'Multiple Accounts',
        description: (
          <>
            Create and manage up to 4 accounts under one wallet.{' '}
            <LinkButton
              colorVariant="accent"
              onClick={() => show({ type: 'manage_subaccounts', params: {} })}
              disabled={!isConnected}
            >
              Manage Subaccounts
            </LinkButton>
          </>
        ),
        desktopBgImgSrc: isVertex
          ? vertexMultipleAccountBg
          : blitzMultipleAccountBg,
      },
    ];
  }, [isVertex, isConnected, show]);
}
