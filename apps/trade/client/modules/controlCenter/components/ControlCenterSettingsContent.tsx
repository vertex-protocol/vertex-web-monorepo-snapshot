import { Button, Divider, Icons } from '@vertex-protocol/web-ui';
import { useSizeClass } from 'client/hooks/ui/breakpoints';
import { OrderLinesToggle } from 'client/modules/controlCenter/components/AppSettings/OrderLinesToggle';
import { OrderNotificationsToggle } from 'client/modules/controlCenter/components/AppSettings/OrderNotificationsToggle';
import { OrderSlippageForm } from 'client/modules/controlCenter/components/AppSettings/OrderSlippageForm/OrderSlippageForm';
import { useOrderSlippageForm } from 'client/modules/controlCenter/components/AppSettings/OrderSlippageForm/useOrderSlippageForm/useOrderSlippageForm';
import { TradingConsolePosition } from 'client/modules/controlCenter/components/AppSettings/TradingConsolePosition';

interface Props {
  onBackClick: () => void;
}

export function ControlCenterSettingsContent({ onBackClick }: Props) {
  const { forms: orderSlippageForms } = useOrderSlippageForm();
  const { isMobile } = useSizeClass();

  return (
    <>
      <div className="grid grid-cols-3">
        <Button
          startIcon={<Icons.FiChevronLeft size={20} />}
          onClick={onBackClick}
          // Padding to increase touch target
          className="w-fit pr-4"
        />
        <span className="text-text-primary text-center">Settings</span>
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
    </>
  );
}
