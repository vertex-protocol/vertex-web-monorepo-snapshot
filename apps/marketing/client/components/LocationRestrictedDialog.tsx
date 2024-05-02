import * as Dialog from '@radix-ui/react-dialog';
import { GEOBLOCKED_COUNTRY_NAMES } from '@vertex-protocol/web-common';
import classNames from 'classnames';
import { EXTERNAL_LINKS } from 'client/consts';
import Link from 'next/link';

import { HomePageButton } from './Button/HomePageButton';

export function LocationRestrictedDialog() {
  return (
    <Dialog.Root open>
      <Dialog.Overlay className="bg-black-900/50 backdrop-blur-nav fixed inset-0 z-30 flex items-center justify-center duration-500">
        <Dialog.Content
          className={classNames(
            'flex w-full max-w-[min(95vw,420px)] flex-col items-center justify-center',
            'bg-black-600 overflow-hidden rounded-xl text-white',
            // outline-none is required to prevent unwarranted outline on mount
            'font-dmSans border-white-600 border outline-none',
          )}
        >
          <Dialog.Title className="border-white-600 w-full border-b px-6 py-4 text-lg lg:text-xl">
            Restricted Territory
          </Dialog.Title>
          <div className="flex flex-col items-center gap-y-6 p-6 text-xs">
            <p>
              It appears that you are accessing from a Restricted Territory.
              Unfortunately, we are not able to support users from the following
              Restricted Territories at this time:
            </p>
            <div className="text-white-700 bg-black-900 w-full rounded p-4">
              {GEOBLOCKED_COUNTRY_NAMES.map((name) => {
                return <p key={name}>{name}</p>;
              })}
            </div>
            <div className="w-full">
              Please refer to our{' '}
              <HomePageButton
                as={Link}
                href={EXTERNAL_LINKS.termsOfUse}
                className="text-purple-500 underline outline-none hover:brightness-125"
                external
              >
                Terms of Use
              </HomePageButton>{' '}
              for additional information.
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
}
