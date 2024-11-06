import { GEOBLOCKED_COUNTRY_NAMES } from '@vertex-protocol/web-common';
import { LinkButton } from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function LocationRestrictedDialog() {
  return (
    <BaseAppDialog.Container>
      <BaseAppDialog.Title>Restricted Territory</BaseAppDialog.Title>
      <BaseAppDialog.Body className="text-xs">
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
            colorVariant="accent"
            href={LINKS.termsOfUse}
            as={Link}
            external
          >
            Terms of Use
          </LinkButton>{' '}
          for additional information.
        </p>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
