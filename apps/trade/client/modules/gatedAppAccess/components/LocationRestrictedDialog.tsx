import { GEOBLOCKED_COUNTRY_NAMES } from '@vertex-protocol/web-common';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { LinkButton } from 'client/components/LinkButton';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { LINKS } from 'client/modules/brand/links';
import Link from 'next/link';

export function LocationRestrictedDialog() {
  return (
    <BaseAppDialog>
      <BaseDialog.Title>Restricted Territory</BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col items-center gap-y-6 text-xs">
        <p>
          It appears that you are accessing from a Restricted Territory.
          Unfortunately, we are not able to support users from the following
          Restricted Territories at this time:
        </p>
        <p className="text-text-tertiary bg-surface-1 w-full rounded p-4">
          {GEOBLOCKED_COUNTRY_NAMES.map((name) => {
            return (
              <span key={name}>
                {name}
                <br />
              </span>
            );
          })}
        </p>
        <p className="w-full">
          Please refer to our{' '}
          <LinkButton color="accent" href={LINKS.termsOfUse} as={Link} external>
            Terms of Use
          </LinkButton>{' '}
          for additional information.
        </p>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
