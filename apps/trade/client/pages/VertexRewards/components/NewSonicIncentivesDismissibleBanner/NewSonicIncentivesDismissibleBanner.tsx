'use client';

import { SONIC_CHAIN_ENVS } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Button,
  Card,
  Icons,
  LinkButton,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { NewPill } from 'client/components/NewPill';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useIsEnabledForChainEnvs } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainEnvs';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';

import backgroundImg from 'client/pages/VertexRewards/components/NewSonicIncentivesDismissibleBanner/background.svg';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Image from 'next/image';
import Link from 'next/link';

export function NewSonicIncentivesDismissibleBanner() {
  const { shouldShow, dismiss } = useShowUserDisclosure(
    'sonic_incentives_rewards_page_banner',
  );
  const isSonic = useIsEnabledForChainEnvs(SONIC_CHAIN_ENVS);

  if (!shouldShow || !isSonic) {
    return null;
  }

  return (
    <Card
      className={joinClassNames(
        'relative isolate',
        'overflow-hidden p-4 text-sm',
      )}
    >
      <div className="relative z-10 flex flex-col items-start gap-y-3">
        <div className="flex items-center gap-x-2 text-base">
          <NewPill />
          <span className="text-text-primary font-medium">
            New Sonic Incentives
          </span>
        </div>
        <p>
          125k S tokens per week will be distributed proportionally to taker
          volume.
        </p>
        <div className="flex items-center gap-x-4">
          <SecondaryButton as={Link} href={ROUTES.perpTrading}>
            Trade Now
          </SecondaryButton>
          <LinkButton
            as={Link}
            colorVariant="primary"
            className="text-xs"
            href={VERTEX_SPECIFIC_LINKS.sonicIncentivesDocs}
            external
            withExternalIcon
          >
            Learn More
          </LinkButton>
        </div>
      </div>
      <Button
        endIcon={<Icons.X size={14} />}
        onClick={dismiss}
        className="absolute top-4 right-4 z-10"
      />
      <Image
        src={backgroundImg}
        alt=""
        className="absolute top-0 right-0 z-0 h-full w-auto"
      />
    </Card>
  );
}
