import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Button,
  Divider,
  getStateOverlayClassNames,
  Icons,
  LinkButton,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ROUTES } from 'client/modules/app/consts/routes';
import {
  NavAccountInfoPinItem,
  useNavAccountInfoPins,
} from 'client/modules/app/navBar/accountInfo/useNavAccountInfoPins';
import { NavAccountPinID } from 'client/modules/localstorage/userSettings/types/navAccountPins';
import Link from 'next/link';

export function NavAccountInfoPinsDropdownContent() {
  const { items, toggleIsPinned, maxNumPins } = useNavAccountInfoPins();

  return (
    <>
      <div className="flex flex-col gap-y-2 px-3 py-2">
        <DropdownMenu.Label className="text-text-primary flex flex-col text-base">
          Account
          <div className="text-text-tertiary text-sm">
            Pin up to {maxNumPins} elements
          </div>
        </DropdownMenu.Label>
        <Divider />
        <DropdownMenu.Group className="flex flex-col gap-y-1">
          {items.map((item) => (
            <Item
              key={item.localStorageId}
              toggleIsPinned={toggleIsPinned}
              {...item}
            />
          ))}
        </DropdownMenu.Group>
      </div>
      <DropdownMenu.Group
        className={joinClassNames(
          'flex justify-end border-t p-2 pb-0',
          'border-overlay-divider border-t',
        )}
      >
        <DropdownMenu.Item asChild>
          <LinkButton
            as={Link}
            colorVariant="primary"
            href={ROUTES.portfolio.overview}
            endIcon={<Icons.ArrowRight size={16} />}
            className="gap-x-1 px-1 py-0.5 text-xs no-underline"
          >
            View Portfolio
          </LinkButton>
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    </>
  );
}

type ItemProps = NavAccountInfoPinItem & {
  toggleIsPinned(localStorageId: NavAccountPinID): void;
};

function Item({
  localStorageId,
  isPinned,
  toggleIsPinned,
  sizeVariant,
  ...valueWithLabelProps
}: ItemProps) {
  const hoverStateClassName = getStateOverlayClassNames({
    borderRadiusVariant: 'sm',
  });

  return (
    <DropdownMenu.Item asChild>
      <Button
        className={joinClassNames(
          'flex items-center gap-x-1 rounded-sm p-0.5',
          hoverStateClassName,
        )}
        onClick={(e) => {
          // Prevent the menu from closing when an item is selected.
          e.preventDefault();

          toggleIsPinned(localStorageId);
        }}
      >
        <Icons.PushPin
          size={16}
          className={isPinned ? 'text-accent' : 'text-disabled'}
        />
        <ValueWithLabel.Horizontal
          sizeVariant={sizeVariant ?? 'sm'}
          className="flex-1"
          labelClassName="text-text-primary"
          {...valueWithLabelProps}
        />
      </Button>
    </DropdownMenu.Item>
  );
}
