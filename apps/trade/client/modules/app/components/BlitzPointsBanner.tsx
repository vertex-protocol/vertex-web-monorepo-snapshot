import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Button, Icons } from '@vertex-protocol/web-ui';
import { LinkButton } from 'client/components/LinkButton';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useIsEnabledForBrand } from 'client/modules/brand/hooks/useIsEnabledForBrand';
import { BLITZ_SPECIFIC_IMAGES } from 'client/modules/brand/images';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import Image from 'next/image';
import Link from 'next/link';

export function BlitzPointsBanner({ className }: WithClassnames) {
  const isBlitz = useIsEnabledForBrand(['blitz']);
  const { shouldShow, dismiss } = useShowUserDisclosure('blitz_points_banner');

  if (!isBlitz || !shouldShow) {
    return null;
  }

  return (
    // bg darkens the background image
    <div className={joinClassNames('relative', className)}>
      <div className="flex flex-col items-center gap-y-1.5 px-5 py-3 backdrop-blur-sm">
        <div className="relative w-full text-sm">
          <h2 className="text-text-primary text-center">
            Blitz Farming Frenzy
          </h2>
          <Button className="absolute right-0 top-1/2 -translate-y-1/2">
            <Icons.MdClose size={20} onClick={dismiss} />
          </Button>
        </div>
        <div className="flex flex-col gap-1.5 text-xs sm:flex-row">
          Earn your share of Blitz Points, Blast Points and Gold. Deposit and
          trade to start earning.
          <LinkButton as={Link} href={ROUTES.points} color="white">
            Visit Points Page
          </LinkButton>
        </div>
      </div>
      <Image
        src={BLITZ_SPECIFIC_IMAGES.blitzBrandBg}
        alt="blitz background"
        fill
        className="-z-10 object-cover brightness-50"
      />
    </div>
  );
}
