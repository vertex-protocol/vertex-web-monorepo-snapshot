import { useQueryIpBlockStatus } from '@vertex-protocol/react-client';
import { GEOBLOCKED_COUNTRY_NAMES } from '@vertex-protocol/web-common';
import { BaseDialog, Card, LinkButton } from '@vertex-protocol/web-ui';
import { VERTEX_EXTERNAL_LINKS } from 'client/config/links';
import { noop } from 'lodash';
import Link from 'next/link';

export function LocationRestrictedDialog() {
  const { data: ipBlockStatus } = useQueryIpBlockStatus();

  const isBlocked = ipBlockStatus === 'blocked';

  return (
    <BaseDialog.Container onOpenChange={noop} open={isBlocked}>
      <BaseDialog.Title>Restricted Territory</BaseDialog.Title>
      <BaseDialog.Body className="text-xs">
        <p>
          It appears that you are accessing from a Restricted Territory. We are
          not able to support users from the following Restricted Territories at
          this time:
        </p>
        <Card className="bg-surface-1 p-4">
          {GEOBLOCKED_COUNTRY_NAMES.sanctioned.map((name) => {
            return (
              <span key={name}>
                {name}
                <br />
              </span>
            );
          })}
        </Card>
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
