import classNames from 'classnames';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { EXTERNAL_LINKS } from 'client/consts';
import Link from 'next/link';

export function ContactLink() {
  return (
    <div
      className={classNames(
        'inline items-center justify-start py-2',
        'text-white-700 text-left text-xs',
        'md:text-base',
      )}
    >
      Get in touch:{' '}
      <HomePageButton
        className="text-white underline hover:text-purple-800"
        as={Link}
        href={EXTERNAL_LINKS.contact}
        external
      >
        contact@vertexprotocol.com
      </HomePageButton>
    </div>
  );
}
