import { Divider } from '@vertex-protocol/web-ui';
import { useIsMobile } from 'client/hooks/ui/breakpoints';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { OneClickTradingSettingsEntrypoint } from 'client/modules/settings/components/OneClickTradingSettingsEntrypoint';
import { OrderLinesToggle } from 'client/modules/settings/components/OrderLinesToggle';
import { OrderNotificationsToggle } from 'client/modules/settings/components/OrderNotificationsToggle';
import { OrderSlippageForm } from 'client/modules/settings/components/OrderSlippageForm/OrderSlippageForm';
import { useOrderSlippageForm } from 'client/modules/settings/components/OrderSlippageForm/useOrderSlippageForm/useOrderSlippageForm';
import { TradingConsolePosition } from 'client/modules/settings/components/TradingConsolePosition';

export function SettingsDialog() {
  const { hide } = useDialog();
  const { forms: orderSlippageForms } = useOrderSlippageForm();
  const isMobile = useIsMobile();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Settings</BaseAppDialog.Title>
      <BaseAppDialog.Body>
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
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
