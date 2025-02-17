'use client';

import {
  ABSTRACT_CHAIN_ENVS,
  BLAST_CHAIN_ENVS,
  useEVMContext,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Icons, LinkButton } from '@vertex-protocol/web-ui';
import abstractLogo from 'client/modules/app/components/banners/AbstractLaunchPromoBanner/abstract-full-logo.svg';

import edgeLogo from 'client/modules/app/components/banners/AbstractLaunchPromoBanner/edge.svg';
import { AppPromoBanner } from 'client/modules/app/components/banners/AppPromoBanner/AppPromoBanner';
import { useIsEnabledForChainEnvs } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainEnvs';
import Image from 'next/image';

export function AbstractLaunchPromoBanner({ className }: WithClassnames) {
  const isBlastOrAbstract = useIsEnabledForChainEnvs([
    ...BLAST_CHAIN_ENVS,
    ...ABSTRACT_CHAIN_ENVS,
  ]);

  const { setPrimaryChainEnv } = useEVMContext();
  const {
    primaryChainMetadata: { isTestnet },
  } = useVertexMetadataContext();

  const onSwitchToAbstractClick = () => {
    setPrimaryChainEnv(isTestnet ? 'abstractTestnet' : 'abstract');
  };

  if (isBlastOrAbstract) {
    return null;
  }

  return (
    <AppPromoBanner
      disclosureKey="abstract_launch"
      variant="abstract"
      className={joinClassNames('text-text-primary gap-x-2', className)}
    >
      <div className="flex items-center gap-x-1">
        <Image src={edgeLogo} alt="Vertex Edge" className="h-3.5 w-auto" />
        <Icons.X className="text-text-primary" />
        <Image src={abstractLogo} alt="Abstract" className="h-4 w-auto" />
      </div>
      <span>
        Vertex Edge Launches 7th Chain -{' '}
        <span className="font-bold">Abstract</span>
      </span>
      <LinkButton colorVariant="primary" onClick={onSwitchToAbstractClick}>
        Check Out Abstract
      </LinkButton>
    </AppPromoBanner>
  );
}
