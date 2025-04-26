import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { DesktopNavCustomPopover } from 'client/modules/app/navBar/components/DesktopNavCustomPopover';
import { useEarnLinks } from 'client/modules/app/navBar/earn/useEarnLinks';
import { useGetIsActiveRoute } from 'client/modules/app/navBar/hooks/useGetIsActiveRoute';

export function DesktopEarnPopover() {
  const earnLinks = useEarnLinks();
  const getIsActiveRoute = useGetIsActiveRoute();

  const popoverTriggerIsActive = getIsActiveRoute(
    ...earnLinks.map(({ href }) => href),
  );

  return (
    <DesktopNavCustomPopover
      triggerContent={
        <AppNavItemButton active={popoverTriggerIsActive} withCaret>
          Earn
        </AppNavItemButton>
      }
      popoverClassName="flex flex-col gap-y-2 w-128"
      popoverContent={
        <>
          <Header />
          {earnLinks.map(({ href, pageLabel, desktopComponent: Component }) => {
            return <Component href={href} pageLabel={pageLabel} key={href} />;
          })}
        </>
      }
    />
  );
}

function Header() {
  return (
    <div className="text-text-tertiary flex items-center px-2 text-xs">
      <span
        // Using `w-56` here to maintain a consistent layout with "Page" column in the links.
        className="w-56"
      >
        Page
      </span>
      <span>Top Opportunity</span>
    </div>
  );
}
