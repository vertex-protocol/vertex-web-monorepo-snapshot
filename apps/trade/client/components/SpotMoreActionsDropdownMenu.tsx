import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  getStateOverlayClassNames,
  Icons,
  SecondaryButton,
  TextButton,
} from '@vertex-protocol/web-ui';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useState } from 'react';

interface Props {
  productId: number;
  balanceAmount: BigDecimal;
}

export function SpotMoreActionsDropdownMenu({
  productId,
  balanceAmount,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showDialogForProduct = useShowDialogForProduct();

  const isConnected = useIsConnected();
  const isMenuDisabled = !isConnected;
  const isRepayDisabled = balanceAmount.gte(0);

  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'sm',
  });
  const activeStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'sm',
    active: true,
  });

  return (
    // We capture `isMenuOpen` to handle highlight of More button.
    <DropdownMenu.Root onOpenChange={setIsMenuOpen}>
      <DropdownMenu.Trigger asChild disabled={isMenuDisabled}>
        <SecondaryButton
          size="xs"
          onClick={(event) => {
            event.stopPropagation();
          }}
          className={joinClassNames(
            isMenuOpen && 'text-text-primary',
            isMenuOpen && activeStateOverlayClassNames,
          )}
        >
          <Icons.DotsThreeVertical />
        </SecondaryButton>
      </DropdownMenu.Trigger>
      {/* we use Portal to avoid z-fighting with other table rows and overflow issues with the parent table */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          align="end"
          sideOffset={4}
          className={joinClassNames(
            'flex flex-col',
            'min-w-24 p-1',
            'bg-surface-2 rounded-sm',
            'text-xs',
          )}
          onClick={(event) => {
            /* any click in popover should not trigger row's onClick */
            event.stopPropagation();
          }}
        >
          <DropdownMenu.Item asChild>
            <TextButton
              colorVariant="secondary"
              className={joinClassNames(
                'justify-start p-1.5',
                hoverStateOverlayClassNames,
              )}
              onClick={() => {
                showDialogForProduct({
                  dialogType: 'borrow',
                  productId,
                });
              }}
            >
              Borrow
            </TextButton>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <TextButton
              colorVariant="secondary"
              disabled={isRepayDisabled}
              className={joinClassNames(
                'justify-start p-1.5',
                !isRepayDisabled && hoverStateOverlayClassNames,
              )}
              onClick={() => {
                showDialogForProduct({
                  dialogType: 'repay',
                  productId,
                });
              }}
            >
              Repay
            </TextButton>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
