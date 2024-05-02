import { LinkButton } from 'client/components/LinkButton';
import { LINKS } from 'client/modules/brand/links';
import Image from 'next/image';
import Link from 'next/link';
import edgeImage from '../assets/edge.svg';

export function EdgeFooter() {
  return (
    <div className="flex justify-between text-xs">
      <div className="text-text-secondary flex items-center gap-x-2">
        Powered by <Image src={edgeImage} className="h-3 w-auto" alt="EDGE" />
      </div>
      <LinkButton
        as={Link}
        external
        color="white"
        withExternalIcon
        href={LINKS.edge}
      >
        Learn more
      </LinkButton>
    </div>
  );
}
