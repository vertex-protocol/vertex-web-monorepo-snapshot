import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { Icons, LinkButton, SecondaryButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { SUBACCOUNT_LIMIT } from 'client/context/subaccount/consts';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useRepeatedClickCountHandler } from 'client/hooks/ui/useRepeatedClickCountHandler';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ManageSubaccountsDialogSubaccountCard } from 'client/modules/subaccounts/components/dialogs/ManageSubaccountsDialog/ManageSubaccountsDialogSubaccountCard';
import { useAllSubaccountsWithMetrics } from 'client/modules/subaccounts/hooks/useAllSubaccountsWithMetrics';
import { useCumulativePortfolioValueUsd } from 'client/modules/subaccounts/hooks/useCumulativePortfolioValueUsd';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function ManageSubaccountsDialog() {
  const { currentSubaccount, canAddSubaccount, appSubaccountNames } =
    useSubaccountContext();
  const subaccountsWithMetrics = useAllSubaccountsWithMetrics();
  const cumulativePortfolioValueUsd = useCumulativePortfolioValueUsd();
  const { hide, push } = useDialog();

  // Hidden feature for MM's to access alternate subaccounts.
  const handleTitleClick = useRepeatedClickCountHandler({
    handler: (count) => {
      if (count === 3) {
        push({ type: 'change_subaccount', params: {} });
      }
    },
  });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title
        onClose={hide}
        endElement={
          <LinkButton
            className="text-sm"
            colorVariant="primary"
            as={Link}
            href={LINKS.multipleSubaccountsDocs}
            withExternalIcon
            external
          >
            Docs
          </LinkButton>
        }
      >
        <div onClick={handleTitleClick}>Accounts</div>
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <div className="grid grid-cols-2 gap-2 lg:gap-4">
          <ValueWithLabel.Vertical
            sizeVariant="lg"
            label="Sum of Accounts"
            tooltip={{ id: 'sumOfSubaccounts' }}
            value={cumulativePortfolioValueUsd}
            numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          />
          <ValueWithLabel.Vertical
            sizeVariant="lg"
            label="Accounts"
            // Use # of app subaccounts as there might be other subaccounts created via API
            valueContent={appSubaccountNames.length}
            valueEndElement={
              <span className="text-sm">/ {SUBACCOUNT_LIMIT} max</span>
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {subaccountsWithMetrics.map((subaccount) => (
            <ManageSubaccountsDialogSubaccountCard
              key={subaccount.subaccountName}
              subaccount={subaccount}
              isActive={currentSubaccount.name === subaccount.subaccountName}
            />
          ))}
        </div>
      </BaseAppDialog.Body>
      <BaseAppDialog.Footer className="flex gap-x-2 sm:gap-x-3">
        {canAddSubaccount && (
          <SecondaryButton
            className="flex-1 px-0"
            startIcon={<Icons.Plus />}
            onClick={() => push({ type: 'create_subaccount', params: {} })}
          >
            Add Account
          </SecondaryButton>
        )}
        <SecondaryButton
          className="flex-1 px-0"
          startIcon={<Icons.ArrowsLeftRight />}
          onClick={() =>
            push({ type: 'subaccount_quote_transfer', params: {} })
          }
        >
          Transfer Funds
        </SecondaryButton>
      </BaseAppDialog.Footer>
    </BaseAppDialog.Container>
  );
}
