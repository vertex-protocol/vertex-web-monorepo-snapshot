import Image from 'next/image';
import Link from 'next/link';
import vertexLogo from 'client/assets/vertex-logo.svg';
import { LINKS } from 'client/links';
import { LinkButton } from './Button/LinkButton';

export function NavBar() {
  return (
    <nav className="bg-black-500 border-black-200 flex justify-between border-b px-10 py-4 text-white">
      <LinkButton href={LINKS.marketing} as={Link} color="white" external>
        <Image src={vertexLogo} alt="vertex-logo" width={100} />
      </LinkButton>
      <div className="flex gap-4">
        <LinkButton
          color="white"
          as={Link}
          href={LINKS.appMarkets}
          external
          className="no-underline"
        >
          App
        </LinkButton>
        <LinkButton
          color="white"
          as={Link}
          href={LINKS.docs}
          external
          className="no-underline"
        >
          Docs
        </LinkButton>
      </div>
    </nav>
  );
}
