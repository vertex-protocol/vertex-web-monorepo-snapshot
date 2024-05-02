import { useBlitzCookiePreference } from 'hooks/useBlitzCookiePreference';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import Link from 'next/link';
import { LINKS } from 'config/links';

export function CookieNoticeBanner({ className }: WithClassnames) {
  const {
    areCookiesAccepted,
    didLoadPersistedValue,
    acceptCookies,
    declineCookies,
  } = useBlitzCookiePreference();

  const showCookieNotice = areCookiesAccepted === null && didLoadPersistedValue;

  if (!showCookieNotice) {
    return null;
  }

  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-x-8 gap-y-4 bg-black px-6 py-3 lg:w-8/12 lg:flex-row',
        className,
      )}
    >
      <div className="flex flex-col gap-y-2 ">
        <p className="text-sm font-bold text-white">Manage Cookies</p>
        <p className="text-white-dark text-xs">
          Blitz may collect and disclose cookie and other data collection
          technologies (“Cookies”) to third-party partners, including service
          providers, basic identification information, device information and
          other unique identifiers, related to your activity on our website and
          applications, such as your location, pages visited, custom events,
          certain interactions with trading features, and commercial data. You
          may accept or reject all Cookies by clicking on the “Accept All” or
          “Reject All” button below. You may withdraw your consent with respect
          to Cookies at any time. Click{' '}
          <Link
            href={LINKS.cookiePolicy}
            target="_blank"
            className="text-pink underline hover:brightness-125"
          >
            here
          </Link>{' '}
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
    'py-3 px-6 bg-black-dark text-nowrap hover:brightness-125';
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
