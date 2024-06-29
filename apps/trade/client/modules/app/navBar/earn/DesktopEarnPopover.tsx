import { Divider, NavCardButton } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { AppNavItemButton } from 'client/modules/app/navBar/components/AppNavItemButton';
import { DesktopNavCustomPopover } from 'client/modules/app/navBar/components/DesktopNavCustomPopover';
import Link from 'next/link';
import { useState } from 'react';
import { useGetIsActiveRoute } from '../hooks/useGetIsActiveRoute';
import { useEarnLinks } from './useEarnLinks';

export function DesktopEarnPopover() {
  const earnLinks = useEarnLinks();
  const getIsActiveRoute = useGetIsActiveRoute();
  const [open, setOpen] = useState(false);

  // Since earnLinks.ecosystem is an external link, it is enough to check earnLinks.products - but if that changes, we need to update this logic too
  const popoverTriggerIsActive =
    open || getIsActiveRoute(...earnLinks.products.map(({ href }) => href));

  const showEcosystemLinks = !!earnLinks.ecosystem.length;

  return (
    <DesktopNavCustomPopover
      open={open}
      setOpen={setOpen}
      triggerContent={
        <AppNavItemButton
          active={popoverTriggerIsActive}
          endIcon={<UpDownChevronIcon open={open} />}
        >
          Earn
        </AppNavItemButton>
      }
      popoverClassName="flex flex-col gap-y-4 w-[510px]"
      popoverContent={
        <>
          <div className="flex flex-col gap-y-2">
            <DesktopEarnHeader title="Products" />
            <div className="grid grid-cols-2 gap-2">
              {earnLinks.products.map(
                ({ label, description, icon, href, external }) => {
                  return (
                    <NavCardButton
                      as={Link}
                      key={label}
                      icon={icon}
                      title={label}
                      description={description}
                      href={href}
                      external={external}
                    />
                  );
                },
              )}
            </div>
          </div>
          {showEcosystemLinks && (
            <>
              <Divider />
              <div className="flex flex-col gap-y-2">
                <DesktopEarnHeader title="Ecosystem" />
                <div className="grid grid-cols-2 gap-2">
                  {earnLinks.ecosystem.map(
                    ({ label, icon, description, href, external }) => (
                      <NavCardButton
                        as={Link}
                        key={label}
                        icon={icon}
                        title={label}
                        description={description}
                        external={external}
                        href={href}
                      />
                    ),
                  )}
                </div>
              </div>
            </>
          )}
        </>
      }
    />
  );
}

function DesktopEarnHeader({ title }: { title: string }) {
  return <div className="text-text-tertiary px-2 text-xs">{title}</div>;
}
