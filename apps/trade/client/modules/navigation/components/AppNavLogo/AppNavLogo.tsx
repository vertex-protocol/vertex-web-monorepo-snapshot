import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ROUTES } from 'client/modules/app/consts/routes';
import { IMAGES } from 'client/modules/brand/images';
import Image from 'next/image';
import Link from 'next/link';

export function AppNavLogo({ className }: WithClassnames) {
  return (
    <Link
      href={ROUTES.portfolio.overview}
      className={joinClassNames('cursor-pointer', className)}
    >
      <Image src={IMAGES.brandLogo} alt="logo" className="h-3.5 w-auto" />
    </Link>
  );
}
