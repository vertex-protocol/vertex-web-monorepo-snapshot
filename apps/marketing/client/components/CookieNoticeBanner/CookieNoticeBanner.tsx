'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { Container } from 'client/components/Container/Container';
import { ExternalLink } from 'client/components/Link/Link';
import { useVertexCookiePreference } from 'client/hooks/useVertexCookiePreference';
import { LINKS } from 'config/links';

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
    <div className="fixed bottom-8 z-10 flex w-full justify-center">
      <Container className="max-w-7xl">
        <div
          className={joinClassNames(
            'border-glass bg-dark-10 shadow-glass rounded border backdrop-blur-md',
            'flex flex-col gap-x-8 gap-y-4 p-5',
          )}
        >
          <div className="flex flex-col gap-y-2">
            <p className="text-body-14 text-white">Manage Cookies</p>
            <p className="text-body-13 text-body-gray">
              Vertex may collect and disclose “Cookies” and other data
              collection technologies to third-party partners, including service
              providers, basic identification information, device information,
              and other unique identifiers, related to your activity on our
              website and applications, such as your location, pages visited,
              custom events, certain interactions with trading features, and
              commercial data. You may accept or reject all cookies by clicking
              on the “Accept All” or “Reject All” button below. You may withdraw
              your consent with respect to cookies at any time. Click{' '}
              <ExternalLink
                withHoverEffect={false}
                href={LINKS.privacyPolicy}
                className="inline-flex text-white"
              >
                here
              </ExternalLink>{' '}
              to learn more.
            </p>
          </div>
          <ActionButtons
            acceptCookies={acceptCookies}
            declineCookies={declineCookies}
          />
        </div>
      </Container>
    </div>
  );
}

interface Props {
  acceptCookies: () => void;
  declineCookies: () => void;
}

function ActionButtons({ acceptCookies, declineCookies }: Props) {
  const buttonClassName =
    'text-sm bg-transparent border-none text-white opacity-80 hover:opacity-100 transition-opacity duration-200';

  return (
    <div className="text-body-13 ml-auto flex items-center gap-x-2">
      <button className={buttonClassName} onClick={declineCookies}>
        Reject All
      </button>
      <button className={buttonClassName} onClick={acceptCookies}>
        Accept All
      </button>
    </div>
  );
}
