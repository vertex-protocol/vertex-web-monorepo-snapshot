import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { Divider, Icons, TextButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useAccountCenterCollateralHistory } from 'client/modules/accountCenter/hooks/useAccountCenterCollateralHistory';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import Image from 'next/image';
import Link from 'next/link';

export function AccountCenterCollateralHistory() {
  const { hide } = useDialog();
  const { eventsWithDate } = useAccountCenterCollateralHistory();

  const listContent = (() => {
    if (!eventsWithDate) {
      return null;
    }
    if (eventsWithDate.length === 0) {
      return (
        <span className="text-text-tertiary">
          Your recent deposits & withdrawals will appear here.
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
                return (
                  <ValueWithLabel.Horizontal
                    key={event.id}
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
                            {event.amount.isPositive()
                              ? 'Deposit'
                              : 'Withdrawal'}
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
                );
              })}
            </div>
          );
        })}
      </div>
    );
  })();

  return (
    <div className="flex flex-col gap-y-3 text-sm">
      <div className="flex items-center justify-between">
        <span className="text-text-primary">Deposits & Withdrawals</span>
        <TextButton
          as={Link}
          href={ROUTES.portfolio.history}
          onClick={hide}
          // The icon has inherent padding, so we need to shift the entire component to the right to visually line up the right side
          className="-mr-1 text-xs"
          endIcon={<Icons.BsArrowRightShort size={24} />}
        >
          See full history
        </TextButton>
      </div>
      {listContent}
    </div>
  );
}
