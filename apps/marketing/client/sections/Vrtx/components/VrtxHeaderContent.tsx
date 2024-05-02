import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { ColorBorderButton } from 'client/components/Button/ColorBorderButton';
import { GradientButton } from 'client/components/Button/GradientButton';
import { HeaderCard } from 'client/components/HeaderCard';
import { EXTERNAL_LINKS } from 'client/consts';
import Link from 'next/link';

export function VrtxHeaderContent({ className }: WithClassnames) {
  return (
    <div
      className={joinClassNames(
        'flex flex-col items-center gap-y-8',
        className,
      )}
    >
      <HeaderCard
        heading="The VRTX Token"
        title="VRTX"
        content={
          <>
            <p>Vertex&apos;s utility token launched in October 2023.</p>
            <p>
              <span className="text-white">Stake VRTX</span> to earn your share
              of protocol rewards in <span className="text-white">USDC</span>.
            </p>
          </>
        }
        contentClassNames="text-center"
        className="flex items-center"
      />
      <VrtxCtaButtons />
    </div>
  );
}

function VrtxCtaButtons() {
  const buttonClassNames = 'w-40 sm:w-48 py-3 lg:w-60 lg:py-4';

  return (
    <div className="flex items-center gap-2">
      <GradientButton
        className={buttonClassNames}
        as={Link}
        href={EXTERNAL_LINKS.staking}
        external
      >
        Stake VRTX
      </GradientButton>
      <ColorBorderButton
        className={buttonClassNames}
        as={Link}
        href={EXTERNAL_LINKS.tokenDocs}
        external
      >
        Token Docs
      </ColorBorderButton>
    </div>
  );
}
