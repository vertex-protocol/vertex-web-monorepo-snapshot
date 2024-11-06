import { GEOBLOCKED_COUNTRY_NAMES } from '@vertex-protocol/web-common';
import { BaseDialog, LinkButton } from '@vertex-protocol/web-ui';
import { VERTEX_EXTERNAL_LINKS } from 'client/config/links';
import { useIsGeolocationBlocked } from 'client/hooks/useIsGeolocationBlocked';
import { noop } from 'lodash';
import Link from 'next/link';

export function LocationRestrictedDialog() {
  const { data: isGeolocationBlocked } = useIsGeolocationBlocked();

  return (
    <BaseDialog.Container onOpenChange={noop} open={!!isGeolocationBlocked}>
      <BaseDialog.Title>Restricted Territory</BaseDialog.Title>
      <BaseDialog.Body className="text-xs">
        <p>
          It appears that you are accessing from a Restricted Territory.
          Unfortunately, we are not able to support users from the following
          Restricted Territories at this time:
        </p>
        <p className="text-text-tertiary bg-surface-1 rounded p-4">
          {GEOBLOCKED_COUNTRY_NAMES.map((name) => {
            return (
              <span key={name}>
                {name}
                <br />
              </span>
            );
          })}
        </p>
        <p>
          Please refer to our{' '}
          <LinkButton
            as={Link}
            href={VERTEX_EXTERNAL_LINKS.termsOfUse}
            colorVariant="primary"
            external
          >
            Terms of Use
          </LinkButton>{' '}
          for additional information.{' '}
        </p>
      </BaseDialog.Body>
    </BaseDialog.Container>
  );
}
