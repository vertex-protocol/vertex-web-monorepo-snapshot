import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { NewPill } from 'client/components/NewPill';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function OnrampTabContent() {
  const { show } = useDialog();

  return (
    <div className="flex flex-col gap-y-3 py-2">
      <SecondaryButton
        // h-10 standard height of buttons between tabs
        className="h-10 justify-start"
        size="lg"
        onClick={() =>
          show({
            type: 'transak_onramp_notice',
            params: {},
          })
        }
        startIcon={<Icons.PiCurrencyCircleDollarBold size={20} />}
      >
        <span>Buy Crypto</span>
        <NewPill />
      </SecondaryButton>
      <p className="text-text-secondary text-xs">
        Buy crypto without leaving the app.
      </p>
    </div>
  );
}
