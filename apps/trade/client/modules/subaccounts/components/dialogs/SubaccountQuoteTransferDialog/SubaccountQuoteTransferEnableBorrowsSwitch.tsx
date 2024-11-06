import { Switch } from '@vertex-protocol/web-ui';
import { SwitchLabelWithTooltip } from 'client/components/SwitchLabelWithTooltip';
import { SubaccountQuoteTransferFormValues } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/types';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  enableBorrows: boolean;
  form: UseFormReturn<SubaccountQuoteTransferFormValues>;
}

export function SubaccountQuoteTransferEnableBorrowsSwitch({
  enableBorrows,
  form,
}: Props) {
  return (
    <Switch.Row>
      <SwitchLabelWithTooltip
        id="enable-borrowing"
        definitionId="subaccountQuoteTransferEnableBorrowsSwitch"
      >
        Enable borrowing
      </SwitchLabelWithTooltip>
      <Switch.Toggle
        id="enable-borrowing"
        checked={enableBorrows}
        onCheckedChange={(checked) => form.setValue('enableBorrows', checked)}
      />
    </Switch.Row>
  );
}
