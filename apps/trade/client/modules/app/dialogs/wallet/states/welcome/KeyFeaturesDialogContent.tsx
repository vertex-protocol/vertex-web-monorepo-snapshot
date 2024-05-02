import { Divider, Icons, PrimaryButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { UseConnectWalletStateMachine } from 'client/modules/app/dialogs/wallet/hooks/useConnectWalletStateMachine';

interface Props {
  stateMachine: UseConnectWalletStateMachine;
}

export function KeyFeaturesDialogContent({ stateMachine }: Props) {
  return (
    <>
      <BaseDialog.Title onClose={stateMachine.hideDialog}>
        Welcome!
      </BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-4">
        <p className="text-xs">
          Trade spot and perp markets on a lightning-fast orderbook DEX.
        </p>
        <Divider />
        <div className="bg-surface-1 flex w-full flex-col rounded px-3">
          <WelcomeCard
            icon={<Icons.AiOutlineSafety size={20} />}
            header="Self Custody"
          />
          <WelcomeCard
            icon={<Icons.HiArrowsRightLeft size={20} />}
            header="Trade Spot & Perpetuals"
          />
          <WelcomeCard
            icon={<Icons.MdOutlineCurrencyExchange size={20} />}
            header="Lend & Borrow"
          />
          <WelcomeCard
            icon={<Icons.FiTrendingUp size={20} />}
            header="Universal Cross Margin"
          />
          <WelcomeCard
            icon={<Icons.AiOutlineClockCircle size={20} />}
            header="Lightning Fast"
          />
        </div>
        <Divider />
        <PrimaryButton
          size="lg"
          onClick={stateMachine.keyFeaturesStartTradingClicked}
          className="w-full"
        >
          Start Trading
        </PrimaryButton>
      </BaseDialog.Body>
    </>
  );
}

const WelcomeCard = ({
  icon,
  header,
}: {
  icon: React.ReactNode;
  header: string;
}) => {
  return (
    <div className="text-text-secondary flex items-center gap-x-3 px-2 py-3 text-sm leading-4">
      {icon}
      {header}
    </div>
  );
};
