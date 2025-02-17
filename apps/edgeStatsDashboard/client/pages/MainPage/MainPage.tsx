import Image from 'next/image';
import {
  Button,
  getStateOverlayClassNames,
  LinkButton,
} from '@vertex-protocol/web-ui';
import { DashboardTabs } from 'client/pages/MainPage/components/DashboardTabs';
import edgeWithVertexLogo from 'client/assets/edge-with-vertex-logo.svg';
import Link from 'next/link';
import { LINKS } from 'client/config/links';
import {
  joinClassNames,
  NextImageSrc,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { FadingDivider } from 'client/components/FadingDivider';

import vertexMonochromeIcon from 'client/assets/vertex-monochrome-icon.svg';
import blitzMonochromeIcon from 'client/assets/blitz-monochrome-icon.svg';

export function MainPage() {
  return (
    <>
      <PageHeader />
      <DashboardTabs />
    </>
  );
}

function PageHeader() {
  return (
    <div className="flex flex-col gap-y-3 sm:gap-y-5">
      <FadingDivider />
      <div className="flex flex-col items-start gap-y-6 sm:flex-row sm:items-center sm:gap-x-12 lg:gap-x-44">
        <Image
          src={edgeWithVertexLogo}
          alt="EDGE"
          className="h-10 w-auto lg:h-14"
        />
        <div className="text-sm">
          <p className="text-text-primary font-semibold">
            Multiple Chains, One Order Book
          </p>
          <p className="text-text-secondary font-medium">
            Vertex Edge connects traders across chains on one <br />
            orderbook - the first synchronous network of exchanges.
          </p>
        </div>
        <HeaderActions className="sm:ml-auto" />
      </div>
    </div>
  );
}

function HeaderActions({ className }: WithClassnames) {
  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-y-2 sm:items-end',
        className,
      )}
    >
      <div className="flex items-center gap-x-3">
        <ExternalLinkActionButton
          title="Launch"
          imageSrc={vertexMonochromeIcon}
          href={LINKS.vertexApp}
        />
        <ExternalLinkActionButton
          title="Launch"
          imageSrc={blitzMonochromeIcon}
          href={LINKS.blitzApp}
        />
      </div>
      <div className="text-sm font-medium">
        API Gateway:{' '}
        <LinkButton
          colorVariant="primary"
          as={Link}
          href={LINKS.apiDocs}
          external
        >
          Go to Docs
        </LinkButton>
      </div>
    </div>
  );
}

interface ExternalLinkActionButtonProps {
  imageSrc: NextImageSrc;
  title: string;
  href: string;
}

function ExternalLinkActionButton({
  title,
  href,
  imageSrc,
}: ExternalLinkActionButtonProps) {
  const buttonStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'lg',
  });

  const buttonClassNames = joinClassNames(
    'border border-stroke rounded-lg shadow-elevation',
    'bg-surface-1 py-2 px-5',
    'text-sm text-text-primary',
    buttonStateOverlayClassNames,
  );

  return (
    <Button
      className={buttonClassNames}
      endIcon={<Image className="h-4 w-auto" src={imageSrc} alt={title} />}
      as={Link}
      href={href}
      external
    >
      {title}
    </Button>
  );
}
