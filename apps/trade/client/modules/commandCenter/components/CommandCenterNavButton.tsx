import { NavBarCardButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { Kbd } from 'client/modules/commandCenter/components/Kbd';

export function CommandCenterNavButton() {
  const { show } = useDialog();

  return (
    <NavBarCardButton
      onClick={() => show({ type: 'command_center', params: {} })}
      className="gap-x-2 text-xs"
    >
      <Kbd text="/" /> Search
    </NavBarCardButton>
  );
}
