import {
  mergeClassNames,
  NextImageSrc,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Card, Divider } from '@vertex-protocol/web-ui';
import { VaultHeader } from 'client/modules/skateVaults/components/VaultHeader';
import { ReactNode } from 'react';

export interface VaultCardProps extends WithClassnames {
  partnerImageSrc: NextImageSrc;
  partnerHref: string;
  vaultName: string;
  vaultInfoContent: ReactNode;
  userStateContent: ReactNode;
  actionsContent: ReactNode;
}

export function VaultCard({
  className,
  actionsContent,
  partnerImageSrc,
  partnerHref,
  vaultName,
  vaultInfoContent,
  userStateContent,
}: VaultCardProps) {
  return (
    <Card className={mergeClassNames('flex flex-col gap-y-4 p-4', className)}>
      <VaultHeader
        partnerImageSrc={partnerImageSrc}
        partnerHref={partnerHref}
        vaultName={vaultName}
      />
      <div className="flex flex-col gap-y-2">{vaultInfoContent}</div>
      <Divider />
      <div className="flex flex-1 flex-col gap-y-2">{userStateContent}</div>
      {actionsContent}
    </Card>
  );
}
