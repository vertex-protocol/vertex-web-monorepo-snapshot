import { WithClassnames } from '@vertex-protocol/web-common';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { ROUTES } from 'client/modules/app/consts/routes';
import { AppNavItemButton } from 'client/modules/navigation/components/AppNavItemButton';
import { MobileNavCustomCollapsible } from 'client/modules/navigation/components/MobileNavCustomCollapsible';
import { useGetIsActiveRoute } from 'client/modules/navigation/hooks/useGetIsActiveRoute';
import { useMobileCollapsible } from 'client/modules/navigation/hooks/useMobileCollapsible';
import { VRTX_NAV_LINK_CONTENT } from 'client/modules/navigation/vrtx/content';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import Image from 'next/image';

export function MobileVrtxCollapsible({ className }: WithClassnames) {
  const { collapsibleIsOpen, setCollapsibleIsOpen, onCollapsibleLinkClick } =
    useMobileCollapsible();
  const getIsActiveRoute = useGetIsActiveRoute();

  const isOnTokenPage = getIsActiveRoute(ROUTES.vrtx);
  const isOnRewardsPage = getIsActiveRoute(ROUTES.rewards);
  const currentlySelected =
    isOnTokenPage || isOnRewardsPage || collapsibleIsOpen;

  return (
    <MobileNavCustomCollapsible.Root
      className={className}
      open={collapsibleIsOpen}
      setOpen={setCollapsibleIsOpen}
      triggerContent={
        <AppNavItemButton
          withMobilePadding
          active={currentlySelected}
          startIcon={
            <Image
              src={VRTX_TOKEN_INFO.icon.asset}
              alt={VRTX_TOKEN_INFO.symbol}
              className="aspect-square w-4"
            />
          }
          endIcon={<UpDownChevronIcon open={collapsibleIsOpen} />}
        >
          VRTX
        </AppNavItemButton>
      }
      collapsibleContent={
        <MobileNavCustomCollapsible.LinksContainer>
          <MobileNavCustomCollapsible.LinkButton
            href={ROUTES.vrtx}
            active={isOnTokenPage}
            onClick={onCollapsibleLinkClick}
            className="flex-col items-start"
          >
            {VRTX_NAV_LINK_CONTENT.token.title}
            <div className="text-text-tertiary flex flex-col gap-y-1.5 text-xs">
              {VRTX_NAV_LINK_CONTENT.token.content}
            </div>
          </MobileNavCustomCollapsible.LinkButton>
          <MobileNavCustomCollapsible.LinkButton
            href={ROUTES.rewards}
            active={isOnRewardsPage}
            onClick={onCollapsibleLinkClick}
            className="flex-col items-start"
          >
            {VRTX_NAV_LINK_CONTENT.rewards.title}
            <span className="text-text-tertiary text-xs">
              {VRTX_NAV_LINK_CONTENT.rewards.content}
            </span>
          </MobileNavCustomCollapsible.LinkButton>
        </MobileNavCustomCollapsible.LinksContainer>
      }
    />
  );
}
