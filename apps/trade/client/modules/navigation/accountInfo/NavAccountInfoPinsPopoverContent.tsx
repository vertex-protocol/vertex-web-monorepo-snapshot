import * as Popover from '@radix-ui/react-popover';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Button, Icons } from '@vertex-protocol/web-ui';
import { LineItem } from 'client/components/LineItem/LineItem';
import { LinkButton } from 'client/components/LinkButton';
import { ROUTES } from 'client/modules/app/consts/routes';
import {
  NavAccountInfoPinItem,
  UseNavAccountInfoPins,
  useNavAccountInfoPins,
} from 'client/modules/navigation/accountInfo/useNavAccountInfoPins';
import Link from 'next/link';

export function NavAccountInfoPinsPopoverContent() {
  const { pinSections, toggleIsPinned, maxNumPins } = useNavAccountInfoPins();

  return (
    <>
      <div className="divide-overlay-divider/10 flex flex-col gap-y-2 divide-y px-3 py-2">
        <div className="text-text-primary flex flex-col text-base">
          Account
          <div className="text-text-tertiary text-sm">
            Pin up to {maxNumPins} elements
          </div>
        </div>
        {pinSections.map((section, index) => (
          <div key={index} className="flex flex-col gap-y-2 py-2">
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
          </div>
        ))}
      </div>
      <div className="border-overlay-divider/10 flex justify-end border-t p-2 pb-0">
        <Popover.Close asChild>
          {/* The asChild prop here merges behavior with LinkButton*/}
          <LinkButton
            as={Link}
            color="white"
            href={ROUTES.portfolio.overview}
            endIcon={<Icons.BsArrowRightShort size={16} />}
            className="gap-x-1 px-1 py-0.5 text-xs no-underline"
          >
            View Portfolio
          </LinkButton>
        </Popover.Close>
      </div>
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
  const PinIcon = isPinned ? Icons.PiPushPinFill : Icons.PiPushPin;

  return (
    <Button
      className="hover:bg-overlay-hover/5 items-center gap-x-1 rounded py-0.5"
      onClick={() => toggleIsPinned(localStorageId)}
    >
      <PinIcon
        size={16}
        className={isPinned ? 'text-accent' : 'text-disabled'}
      />
      <LineItem.Base
        label={label}
        value={value}
        className={joinClassNames('flex-1 text-sm', valueClassName)}
      />
    </Button>
  );
}
