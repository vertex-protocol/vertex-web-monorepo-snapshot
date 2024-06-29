import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { LinkButton } from 'client/components/LinkButton';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { PointsPageCard } from 'client/pages/BlitzPoints/components/PointsPageCard';
import { BLITZ_SPECIFIC_IMAGES } from 'common/brandMetadata/images';
import { BLITZ_SPECIFIC_LINKS } from 'common/brandMetadata/links/blitzLinks';
import Image from 'next/image';
import Link from 'next/link';
import blastLogo from '../assets/blast-logo.png';
import bgImg from '../assets/blast-points-bg.png';

interface Props extends WithClassnames {
  points: BigDecimal | undefined;
  gold: BigDecimal | undefined;
}

export function BlastPointsCard({ gold, points, className }: Props) {
  const blastLogoImg = (
    <Image src={blastLogo} alt="blast" className="h-3 w-auto" />
  );

  return (
    <PointsPageCard
      bgImage={bgImg}
      className={joinClassNames(
        'ring-accent-blast flex flex-col gap-y-5',
        className,
      )}
    >
      <div className="flex gap-x-12">
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label={
            <>
              {blastLogoImg}
              Points
            </>
          }
          value={points}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label={
            <>
              {blastLogoImg}
              <Image
                src={BLITZ_SPECIFIC_IMAGES.blastGoldIcon}
                alt="blast gold icon"
                className="size-3"
              />
              Gold
            </>
          }
          value={gold}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
        />
      </div>
      <Divider />
      <div className="flex flex-col gap-y-8">
        <div className="grid gap-3 sm:grid-cols-2">
          <Info
            title="Points"
            description="Your deposits earn Blast points, updated and distributed every few minutes."
          />
          <Info
            title="Gold"
            description="Your activity earns Blast Gold, updated every ~2 weeks and distributed shortly afterwards."
          />
        </div>
        <div
          className={joinClassNames(
            'text-text-tertiary text-xs',
            'flex flex-col items-start gap-2',
            'sm:flex-row sm:items-center sm:justify-between',
          )}
        >
          <span className="whitespace-normal">
            Finalized Blast points and Gold can be viewed on{' '}
            <LinkButton
              colorVariant="accent"
              external
              as={Link}
              href={BLITZ_SPECIFIC_LINKS.blastAirdropPoints}
            >
              Blast
            </LinkButton>
            .
          </span>
          <LinkButton
            colorVariant="primary"
            external
            withExternalIcon
            as={Link}
            href={BLITZ_SPECIFIC_LINKS.pointsProgramDocs}
          >
            Points Docs
          </LinkButton>
        </div>
      </div>
    </PointsPageCard>
  );
}

function Info({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-start">
      <p className="text-text-secondary text-sm">{title}</p>
      <p className="text-text-tertiary text-xs">{description}</p>
    </div>
  );
}
