import { Button, Divider, Icons } from '@vertex-protocol/web-ui';
import { useIsMobile } from 'client/hooks/ui/breakpoints';
import { OneClickTradingSettingsEntrypoint } from 'client/modules/accountCenter/components/AccountCenterSettingsContent/OneClickTradingSettingsEntrypoint';
import { OrderLinesToggle } from 'client/modules/accountCenter/components/AccountCenterSettingsContent/OrderLinesToggle';
import { OrderNotificationsToggle } from 'client/modules/accountCenter/components/AccountCenterSettingsContent/OrderNotificationsToggle';
import { OrderSlippageForm } from 'client/modules/accountCenter/components/AccountCenterSettingsContent/OrderSlippageForm/OrderSlippageForm';
import { useOrderSlippageForm } from 'client/modules/accountCenter/components/AccountCenterSettingsContent/OrderSlippageForm/useOrderSlippageForm/useOrderSlippageForm';
import { TradingConsolePosition } from 'client/modules/accountCenter/components/AccountCenterSettingsContent/TradingConsolePosition';

interface Props {
  onBackClick: () => void;
}

export function AccountCenterSettingsContent({ onBackClick }: Props) {
  const { forms: orderSlippageForms } = useOrderSlippageForm();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid grid-cols-3">
        <Button
          startIcon={<Icons.FiChevronLeft size={20} />}
          onClick={onBackClick}
          // Padding to increase touch target
          className="w-fit pr-4"
        />
        <span className="text-text-primary text-center text-sm">Settings</span>
      </div>
      <Divider />
      <OrderNotificationsToggle />
      <OrderLinesToggle />
      {!isMobile && (
        <>
          <Divider />
          <TradingConsolePosition />
        </>
      )}
      <Divider />
      <OrderSlippageForm forms={orderSlippageForms} />
      <Divider />
      <OneClickTradingSettingsEntrypoint />
    </div>
  );
}
