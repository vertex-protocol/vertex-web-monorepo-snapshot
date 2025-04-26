import { useQueryIpBlockStatus } from '@vertex-protocol/react-client';
import { GEOBLOCKED_COUNTRY_NAMES } from '@vertex-protocol/web-common';
import { Card, LinkButton } from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function LocationRestrictedDialog() {
  const { hide } = useDialog();
  const { data: ipBlockStatus } = useQueryIpBlockStatus();

  const canDismissDialog = ipBlockStatus === 'query_only';
  const onClose = canDismissDialog ? hide : undefined;

  return (
    <BaseAppDialog.Container onClose={onClose}>
      <BaseAppDialog.Title onClose={onClose}>
        Restricted Territory
      </BaseAppDialog.Title>
      <BaseAppDialog.Body className="text-xs">
        <p>
          It appears that you are accessing from a Restricted Territory. We are
          not able to support users from the following Restricted Territories at
          this time:
        </p>
        <CountriesCard countryNames={GEOBLOCKED_COUNTRY_NAMES.sanctioned} />
        <p>
          Users from the following Restricted Territories can view but not use
          the platform:
        </p>
        <CountriesCard countryNames={GEOBLOCKED_COUNTRY_NAMES.queryOnly} />
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

function CountriesCard({ countryNames }: { countryNames: string[] }) {
  return (
    <Card className="bg-surface-1 p-3">
      {countryNames.map((name) => {
        return (
          <span key={name}>
            {name}
            <br />
          </span>
        );
      })}
    </Card>
  );
}
