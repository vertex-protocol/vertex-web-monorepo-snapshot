import { BigDecimal } from '@vertex-protocol/client';
import {
  BLITZ_SPECIFIC_LINKS,
  joinClassNames,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { LinkButton } from 'client/components/LinkButton';
import { BLITZ_SPECIFIC_IMAGES } from 'client/modules/brand/images';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { PointsPageCard } from 'client/pages/BlitzPoints/components/PointsPageCard';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
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
        <RewardsCard.MetricStackedItem
          value={points}
          formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
          label={
            <div className="flex items-center gap-x-1">
              {blastLogoImg}
              Points
            </div>
          }
          valueClassName="text-2xl sm:text-5xl"
        />
        <RewardsCard.MetricStackedItem
          value={gold}
          formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
          label={
            <div className="flex items-center gap-x-1">
              {blastLogoImg}
              <Image
                src={BLITZ_SPECIFIC_IMAGES.blastGoldIcon}
                alt="blast gold icon"
                className="h-3 w-auto"
              />
              Gold
            </div>
          }
          valueClassName="text-2xl sm:text-5xl"
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
          <span>
            Finalized Blast points and Gold can be viewed on{' '}
            <LinkButton
              color="accent"
              external
              as={Link}
              href={BLITZ_SPECIFIC_LINKS.blastAirdropPoints}
            >
              Blast
            </LinkButton>
            .
          </span>
          <LinkButton
            color="white"
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
