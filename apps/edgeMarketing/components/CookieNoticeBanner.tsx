'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { EdgeLink } from 'components/EdgeLink/EdgeLink';
import { LINKS } from 'config/links';
import { useEdgeCookiePreference } from 'hooks/useEdgeCookiePreference';

export function CookieNoticeBanner() {
  const {
    areCookiesAccepted,
    didLoadPersistedValue,
    acceptCookies,
    declineCookies,
  } = useEdgeCookiePreference();

  const showCookieNotice = areCookiesAccepted === null && didLoadPersistedValue;

  if (!showCookieNotice) {
    return null;
  }

  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-x-8 gap-y-4 px-6 py-3 lg:w-8/12 lg:flex-row',
        'bg-gray-light absolute bottom-0 z-10 rounded-2xl lg:right-12 lg:bottom-3',
      )}
    >
      <div className="flex flex-col gap-y-2">
        <p className="text-sm font-bold text-black">Manage Cookies</p>
        <p className="text-white-dark text-xs">
          Edge may collect and disclose cookie and other data collection
          technologies (“Cookies”) to third-party partners, including service
          providers, basic identification information, device information and
          other unique identifiers, related to your activity on our website and
          applications, such as your location, pages visited, custom events,
          certain interactions with trading features, and commercial data. You
          may accept or reject all Cookies by clicking on the “Accept All” or
          “Reject All” button below. You may withdraw your consent with respect
          to Cookies at any time. Click{' '}
          <EdgeLink href={LINKS.cookiePolicy} external className="underline">
            here
          </EdgeLink>{' '}
          to learn more.
        </p>
      </div>
      <ActionButtons
        acceptCookies={acceptCookies}
        declineCookies={declineCookies}
      />
    </div>
  );
}

interface ActionButtonsProps {
  acceptCookies: () => void;
  declineCookies: () => void;
}

function ActionButtons({ acceptCookies, declineCookies }: ActionButtonsProps) {
  const buttonClassNames =
    'py-3 px-6 text-nowrap hover:border-black border-gray border rounded-sm';

  return (
    <div className="flex items-center gap-x-2 text-sm">
      <button className={buttonClassNames} onClick={acceptCookies}>
        Accept All
      </button>
      <button className={buttonClassNames} onClick={declineCookies}>
        Reject All
      </button>
    </div>
  );
}
