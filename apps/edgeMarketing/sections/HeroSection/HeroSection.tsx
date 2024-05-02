import { EdgeBgImage } from 'components/EdgeBgImage/EdgeBgImage';
import { EdgeDescription } from 'components/EdgeDescription/EdgeDescription';
import Image from 'next/image';
import logo from 'public/img/edge-logo.svg';
import React from 'react';
import { BuiltOnEdge } from './components/BuiltOnEdge';
import { EdgeBanner } from 'components/EdgeBanner/EdgeBanner';
import { CookieNoticeBanner } from 'components/CookieNoticeBanner';

/**
 * @name HeroSection
 * @description The hero section of the Edge landing page
 */
export function HeroSection() {
  return (
    <section className="relative flex h-full flex-col">
      <EdgeBgImage />
      <EdgeBanner className="mx-2 mt-2 md:mx-6 md:mt-8" />
      <div className="flex items-start justify-start p-6 pb-16 pt-10 md:flex-1 md:items-center md:justify-center md:p-0 md:pt-10">
        <Image
          className="max-h-[420px] md:w-3/5"
          src={logo}
          alt="logo"
          priority
        />
      </div>
      <div className="flex flex-1 flex-col justify-between sm:flex-row md:flex-none ">
        <EdgeDescription />
        <BuiltOnEdge />
      </div>
      <CookieNoticeBanner />
    </section>
  );
}
