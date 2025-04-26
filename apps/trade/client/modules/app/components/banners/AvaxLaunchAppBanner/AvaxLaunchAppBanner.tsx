'use client';

import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';

import avalancheLogo from 'client/modules/app/components/banners/AvaxLaunchAppBanner/assets/avalanche-logo.svg';
import edgeLogo from 'client/modules/app/components/banners/AvaxLaunchAppBanner/assets/edge-logo.svg';
import { DismissibleAppBanner } from 'client/modules/app/components/banners/DismissibleAppBanner';
import { clientEnv } from 'common/environment/clientEnv';
import Image from 'next/image';

export function AvaxLaunchAppBanner({ className }: WithClassnames) {
  const isVertex = clientEnv.base.brandName === 'vertex';

  if (!isVertex) {
    return null;
  }

  return (
    <DismissibleAppBanner
      disclosureKey="avax_launch_app_banner"
      variant="avax"
      className={joinClassNames('gap-2', className)}
    >
      <EdgeAvaxLogo />
      <span>
        Vertex Edge Launches 8th Chain -{' '}
        <span className="text-text-primary font-bold">Avalanche</span>
      </span>
    </DismissibleAppBanner>
  );
}

function EdgeAvaxLogo() {
  return (
    <div className="flex items-center gap-x-1">
      {/*Use bottom margin to visually center the logo*/}
      <Image src={edgeLogo} alt="Vertex Edge" className="mb-0.5 h-3.5 w-auto" />
      <Icons.X size={10} alt="" />
      <Image src={avalancheLogo} alt="Avalanche" className="h-4 w-auto" />
    </div>
  );
}
