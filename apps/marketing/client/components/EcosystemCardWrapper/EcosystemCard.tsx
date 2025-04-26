'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { ExternalLink } from 'client/components/Link/ExternalLink';
import { EcosystemPartner } from 'client/sections/EcosystemSection/data';
import { motion } from 'framer-motion';

export function EcosystemCard({
  partner,
  comingSoon = false,
}: {
  partner: EcosystemPartner;
  comingSoon: boolean;
}) {
  const cardClasses = joinClassNames(
    'bg-card-gradient border-new-website-overlay-8 md:text-body-gray group rounded-lg border text-white md:opacity-60',
    !comingSoon && 'cursor-pointer',
  );
  const skeletonClasses = 'flex items-center gap-x-4 px-6 py-4';

  const initialAnimationValues = {
    scale: 1,
    opacity: 0.6,
    color: 'currentColor',
  };

  return (
    <motion.div
      className={cardClasses}
      initial={initialAnimationValues}
      {...(!comingSoon && {
        whileHover: comingSoon
          ? initialAnimationValues
          : { scale: 1.01, opacity: 1, color: 'white' },
      })}
      transition={{ duration: 0.15 }}
    >
      {comingSoon ? (
        <div className={skeletonClasses}>
          <EcosystemCardSkeleton partner={partner} />
        </div>
      ) : (
        <ExternalLink href={partner.link} className={skeletonClasses}>
          <EcosystemCardSkeleton partner={partner} />
        </ExternalLink>
      )}
    </motion.div>
  );
}

function EcosystemCardSkeleton({ partner }: { partner: EcosystemPartner }) {
  return (
    <>
      <div className="flex max-w-30 min-w-30 items-center justify-center md:min-w-35">
        <partner.logo size={44} />
      </div>
      <p className="text-body-13 text-body-gray flex-1 md:text-white">
        {partner.description}
      </p>
    </>
  );
}
