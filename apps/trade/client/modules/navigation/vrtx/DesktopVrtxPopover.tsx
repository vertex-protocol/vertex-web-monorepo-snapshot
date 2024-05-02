import { NavCardButton } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { AppNavItemButton } from 'client/modules/navigation/components/AppNavItemButton';
import { DesktopNavCustomPopover } from 'client/modules/navigation/components/DesktopNavCustomPopover';
import { useGetIsActiveRoute } from 'client/modules/navigation/hooks/useGetIsActiveRoute';
import { VRTX_NAV_LINK_CONTENT } from 'client/modules/navigation/vrtx/content';
import { ROUTES } from 'client/modules/app/consts/routes';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function DesktopVrtxPopover() {
  const getIsActiveRoute = useGetIsActiveRoute();
  const [open, setOpen] = useState(false);

  const isOnTokenPage = getIsActiveRoute(ROUTES.vrtx);
  const isOnRewardsPage = getIsActiveRoute(ROUTES.rewards);
  const triggerIsSelected = isOnTokenPage || isOnRewardsPage || open;

  return (
    <DesktopNavCustomPopover
      open={open}
      setOpen={setOpen}
      triggerContent={
        <AppNavItemButton
          active={triggerIsSelected}
          startIcon={
            <Image
              src={VRTX_TOKEN_INFO.icon.asset}
              alt={VRTX_TOKEN_INFO.symbol}
              className="aspect-square w-4"
            />
          }
          endIcon={<UpDownChevronIcon open={open} />}
          className="text-sm"
        >
          VRTX
        </AppNavItemButton>
      }
      popoverClassName="flex flex-col gap-y-1.5 p-2 min-w-[250px]"
      popoverContent={
        <>
          <NavCardButton
            title={VRTX_NAV_LINK_CONTENT.token.title}
            description={VRTX_NAV_LINK_CONTENT.token.content}
            active={isOnTokenPage}
            as={Link}
            href={ROUTES.vrtx}
          />
          <NavCardButton
            title={VRTX_NAV_LINK_CONTENT.rewards.title}
            description={VRTX_NAV_LINK_CONTENT.rewards.content}
            active={isOnRewardsPage}
            as={Link}
            href={ROUTES.rewards}
          />
        </>
      }
    />
  );
}
