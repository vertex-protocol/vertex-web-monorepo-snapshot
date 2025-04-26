import { NextImageSrc } from '@vertex-protocol/web-common';
import { Button, Pill } from '@vertex-protocol/web-ui';
import Image from 'next/image';
import Link from 'next/link';

export function VaultPartnerLogoPill({
  imageSrc,
  href,
}: {
  imageSrc: NextImageSrc;
  href: string;
}) {
  return (
    <Pill sizeVariant="xs" colorVariant="tertiary">
      <Button as={Link} href={href} external>
        <Image src={imageSrc} alt="" className="h-3 w-auto" />
      </Button>
    </Pill>
  );
}
