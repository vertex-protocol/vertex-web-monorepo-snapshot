import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { Divider, Icons, TextButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { AccountCenterWithdrawalStatus } from 'client/modules/accountCenter/components/AccountCenterWithdrawalStatus';
import { useAccountCenterCollateralHistory } from 'client/modules/accountCenter/hooks/useAccountCenterCollateralHistory';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import Image from 'next/image';
import Link from 'next/link';

export function AccountCenterCollateralHistory() {
  const { hide, push } = useDialog();
  const { eventsWithDate } = useAccountCenterCollateralHistory();

  const listContent = (() => {
    if (!eventsWithDate) {
      return null;
    }
    if (eventsWithDate.length === 0) {
      return (
        <span className="text-text-tertiary">
          Your deposits, withdrawals, and transfers will
          <br /> appear here.
        </span>
      );
    }

    return (
      <div className="flex flex-col gap-y-3">
        {eventsWithDate.map((item) => {
          return (
            <div key={item.dateLabel} className="flex flex-col gap-y-1 text-xs">
              <span className="text-text-tertiary text-left">
                {item.dateLabel}
              </span>
              <Divider />
              {item.events.map((event) => {
                const isWithdrawal = event.eventType === 'withdraw_collateral';
                const eventTypeLabel = {
                  deposit_collateral: 'Deposit',
                  withdraw_collateral: 'Withdrawal',
                  transfer_quote: 'Transfer',
                }[event.eventType];

                return (
                  <div key={event.id} className="flex flex-col">
                    <ValueWithLabel.Horizontal
                      sizeVariant="xs"
                      labelClassName="gap-x-2 py-0.5"
                      label={
                        <>
                          <Image
                            src={event.token.icon.asset}
                            alt={event.token.symbol}
                            className="size-6"
                          />
                          <div className="flex flex-col items-start">
                            <span className="text-text-primary">
                              {event.token.symbol}
                            </span>
                            <span className="text-text-tertiary text-2xs uppercase">
                              {eventTypeLabel}
                            </span>
                          </div>
                        </>
                      }
                      value={event.amount}
                      numberFormatSpecifier={
                        CustomNumberFormatSpecifier.NUMBER_PRECISE
                      }
                      valueEndElement={event.token.symbol}
                    />
                    <AccountCenterWithdrawalStatus
                      // `pl-8` used to align with the above `ValueWithLabel`'s label text.
                      className="pl-8"
                      isWithdrawal={isWithdrawal}
                      isProcessing={event.isProcessing}
                      hasWithdrawPoolLiquidity={event.hasWithdrawPoolLiquidity}
                      onFastWithdrawClick={() =>
                        push({
                          type: 'fast_withdraw',
                          params: {
                            productId: event.productId,
                            submissionIndex: event.submissionIndex,
                            withdrawalSize: event.amount.abs(),
                          },
                        })
                      }
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  })();

  return (
    <div className="flex flex-col gap-y-2 text-sm">
      <span className="text-text-primary">Funding Activity</span>
      {listContent}
      {eventsWithDate.length !== 0 && (
        <TextButton
          as={Link}
          href={ROUTES.portfolio.history}
          onClick={hide}
          className="flex-1 self-end text-xs"
          endIcon={<Icons.ArrowRight />}
        >
          See full history
        </TextButton>
      )}
    </div>
  );
}
