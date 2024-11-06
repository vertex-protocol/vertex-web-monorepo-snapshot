'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { ColorBorderButton } from 'client/components/Button/ColorBorderButton';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { EXTERNAL_LINKS } from 'client/consts';
import { useVertexCookiePreference } from 'client/hooks/useVertexCookiePreference';
import Link from 'next/link';

export function CookieNoticeBanner() {
  const {
    areCookiesAccepted,
    didLoadPersistedValue,
    acceptCookies,
    declineCookies,
  } = useVertexCookiePreference();

  const showCookieNotice = areCookiesAccepted === null && didLoadPersistedValue;

  if (!showCookieNotice) {
    return null;
  }

  return (
    <div className="fixed bottom-0 z-10 flex w-full justify-center px-6 py-7 sm:px-16 xl:px-28">
      <div
        className={joinClassNames(
          'flex flex-col gap-x-8 gap-y-4 rounded-2xl px-6 py-3 sm:flex-row',
          'backdrop-blur-nav bg-black-800 shadow-black-900/30 shadow-lg',
        )}
      >
        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-bold text-white">Manage Cookies</p>
          <p className="text-white-700 text-xs">
            Vertex may collect and disclose cookie and other data collection
            technologies (“Cookies”) to third-party partners, including service
            providers, basic identification information, device information and
            other unique identifiers, related to your activity on our website
            and applications, such as your location, pages visited, custom
            events, certain interactions with trading features, and commercial
            data. You may accept or reject all Cookies by clicking on the
            “Accept All” or “Reject All” button below. You may withdraw your
            consent with respect to Cookies at any time. Click{' '}
            <HomePageButton
              as={Link}
              href={EXTERNAL_LINKS.cookiePolicy}
              className="text-purple-500 underline outline-none hover:brightness-125"
              external
            >
              here
            </HomePageButton>{' '}
            to learn more.
          </p>
        </div>
        <ActionButtons
          acceptCookies={acceptCookies}
          declineCookies={declineCookies}
        />
      </div>
    </div>
  );
}

interface ActionButtonsProps {
  acceptCookies: () => void;
  declineCookies: () => void;
}

function ActionButtons({ acceptCookies, declineCookies }: ActionButtonsProps) {
  const buttonClassNames = 'py-3 px-6';
  return (
    <div className="flex h-full items-center gap-x-2 text-sm">
      <ColorBorderButton onClick={acceptCookies} className={buttonClassNames}>
        Accept All
      </ColorBorderButton>
      <ColorBorderButton onClick={declineCookies} className={buttonClassNames}>
        Reject All
      </ColorBorderButton>
    </div>
  );
}
