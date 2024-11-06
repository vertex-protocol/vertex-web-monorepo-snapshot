import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Button,
  COMMON_TRANSPARENCY_COLORS,
  getStateOverlayClassNames,
  Icons,
  LinkButton,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ROUTES } from 'client/modules/app/consts/routes';
import {
  NavAccountInfoPinItem,
  UseNavAccountInfoPins,
  useNavAccountInfoPins,
} from 'client/modules/app/navBar/accountInfo/useNavAccountInfoPins';
import Link from 'next/link';

export function NavAccountInfoPinsDropdownContent() {
  const { pinSections, toggleIsPinned, maxNumPins } = useNavAccountInfoPins();

  return (
    <>
      <div
        className={joinClassNames(
          'flex flex-col gap-y-2 divide-y px-3 py-2',
          COMMON_TRANSPARENCY_COLORS.divide,
        )}
      >
        <DropdownMenu.Label className="text-text-primary flex flex-col text-base">
          Account
          <div className="text-text-tertiary text-sm">
            Pin up to {maxNumPins} elements
          </div>
        </DropdownMenu.Label>
        {pinSections.map((section, index) => (
          <DropdownMenu.Group
            key={index}
            className="flex flex-col gap-y-2 py-2"
          >
            {section.map(
              ({ localStorageId, isPinned, label, value, valueClassName }) => (
                <Item
                  key={localStorageId}
                  localStorageId={localStorageId}
                  toggleIsPinned={toggleIsPinned}
                  isPinned={isPinned}
                  label={label}
                  value={value}
                  valueClassName={valueClassName}
                />
              ),
            )}
          </DropdownMenu.Group>
        ))}
      </div>
      <DropdownMenu.Group
        className={joinClassNames(
          'flex justify-end border-t p-2 pb-0',
          COMMON_TRANSPARENCY_COLORS.border,
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

type ItemProps = NavAccountInfoPinItem &
  Pick<UseNavAccountInfoPins, 'toggleIsPinned'>;

function Item({
  localStorageId,
  isPinned,
  label,
  value,
  valueClassName,
  toggleIsPinned,
}: ItemProps) {
  const hoverStateClassName = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
  });

  return (
    <DropdownMenu.Item asChild>
      <Button
        className={joinClassNames(
          'items-center gap-x-1 rounded p-0.5',
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
          sizeVariant="sm"
          label={label}
          className="flex-1"
          labelClassName="text-text-secondary"
          valueContent={value}
          valueClassName={valueClassName}
        />
      </Button>
    </DropdownMenu.Item>
  );
}
