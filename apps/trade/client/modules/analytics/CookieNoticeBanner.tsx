import { joinClassNames } from '@vertex-protocol/web-common';
import { LinkButton, SecondaryButton } from '@vertex-protocol/web-ui';
import { useCookiePreference } from 'client/modules/analytics/useCookiePreference';
import { LINKS } from 'common/brandMetadata/links/links';
import { clientEnv } from 'common/environment/clientEnv';
import Link from 'next/link';

export function CookieNoticeBanner() {
  const {
    areCookiesAccepted,
    didLoadPersistedValue,
    acceptCookies,
    declineCookies,
  } = useCookiePreference();

  const showCookieNotice = areCookiesAccepted === null && didLoadPersistedValue;

  if (!showCookieNotice) {
    return null;
  }

  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-x-8 gap-y-4 rounded-2xl px-6 py-3 sm:flex-row',
        'border-stroke bg-background border',
        'fixed bottom-4 mx-4 sm:bottom-10 sm:mx-10',
      )}
    >
      <div className="flex flex-col gap-y-2">
        <p className="text-sm text-white">Manage Cookies</p>
        <p className="text-text-tertiary text-xs">
          {clientEnv.brandMetadata.displayName} may collect and disclose cookie
          and other data collection technologies (“Cookies”) to third-party
          partners, including service providers, basic identification
          information, device information and other unique identifiers, related
          to your activity on our website and applications, such as your
          location, pages visited, custom events, certain interactions with
          trading features, and commercial data. You may accept or reject all
          Cookies by clicking on the “Accept All” or “Reject All” button below.
          You may withdraw your consent with respect to Cookies at any time.
          Click{' '}
          <LinkButton
            colorVariant="primary"
            href={LINKS.cookiePolicy}
            external
            as={Link}
          >
            here
          </LinkButton>{' '}
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
  return (
    <div className="flex items-center gap-x-2 text-sm">
      <SecondaryButton size="sm" onClick={acceptCookies}>
        Accept All
      </SecondaryButton>
      <SecondaryButton size="sm" onClick={declineCookies}>
        Reject All
      </SecondaryButton>
    </div>
  );
}
