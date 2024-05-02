import { Icons, NavCardButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';

export function DepositFooter() {
  const { show } = useDialog();

  const depositOptions = [
    {
      icon: Icons.PiShuffleSimple,
      title: 'Cross-Chain Deposit',
      description: 'Bridge & deposit assets from other chains',
      onClick: () => show({ type: 'bridge', params: {} }),
    },
    {
      icon: Icons.PiCurrencyCircleDollarBold,
      title: 'Buy Crypto',
      description: 'Buy crypto without leaving the app',
      onClick: () => show({ type: 'transak_onramp_notice', params: {} }),
    },
  ];

  return (
    <div className="flex flex-col items-start gap-y-3">
      <span className="text-text-primary text-sm">More Options</span>
      <div className="flex w-full flex-col">
        {depositOptions.map(({ icon, title, description, onClick }) => (
          <NavCardButton
            className="hover:bg-surface-1"
            key={title}
            title={title}
            description={description}
            icon={icon}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}
