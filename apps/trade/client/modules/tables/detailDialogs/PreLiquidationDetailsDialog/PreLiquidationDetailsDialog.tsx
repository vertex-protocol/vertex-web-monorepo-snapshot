import * as Accordion from '@radix-ui/react-accordion';
import { useCopyText } from '@vertex-protocol/web-common';
import { Spinner, TextButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { LineItem } from 'client/components/LineItem/LineItem';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { PreLiquidationBalanceAccordionItem } from 'client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/PreLiquidationBalanceAccordionItem';
import { PreLiquidationDetailsDialogParams } from 'client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/types';
import { usePreLiquidationDetailsDialog } from 'client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/usePreLiquidationDetailsDialog';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import {
  formatTimestamp,
  TimeFormatSpecifier,
} from 'client/utils/formatTimestamp';
import { signDependentValue } from 'client/utils/signDependentValue';
import { PRIMARY_QUOTE_SYMBOL } from 'common/productMetadata/primaryQuoteSymbol';
import { useState } from 'react';

export function PreLiquidationDetailsDialog(
  params: PreLiquidationDetailsDialogParams,
) {
  const [openAccordionIds, setOpenAccordionIds] = useState<string[]>([]);
  const { hide } = useDialog();
  const { isLoading, isError, perpBalances, spotBalances, rawJsonData } =
    usePreLiquidationDetailsDialog(params);
  const { copy, isCopied } = useCopyText();

  const noDataContent = (() => {
    if (isLoading) {
      return <Spinner className="w-10" />;
    }
    if (isError) {
      return <span className="text-text-primary">Error Loading Data</span>;
    }
  })();

  const onCopyJsonClick = () => {
    copy(rawJsonData);
  };

  const copyJsonButtonText = isCopied ? 'Copied!' : 'Copy raw data';

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>
        Pre-Liquidation Balances
      </BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-4 text-sm">
        <div className="flex flex-col items-start gap-y-2 text-xs">
          <p>
            The following is a snapshot of your account before the liquidation
            event at{' '}
            {formatTimestamp(params.liquidationTimestampMillis, {
              formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
            })}
            .
          </p>
          <p>
            If asked by support:{' '}
            <TextButton onClick={onCopyJsonClick}>
              {copyJsonButtonText}
            </TextButton>
          </p>
        </div>
        {/*Loading / Error states*/}
        {noDataContent && (
          <div className="flex h-40 items-center justify-center">
            {noDataContent}
          </div>
        )}
        {/*Balances*/}
        <Accordion.Root
          type="multiple"
          className="flex flex-col gap-y-2"
          value={openAccordionIds}
          onValueChange={setOpenAccordionIds}
        >
          {/*Spot balances*/}
          {spotBalances?.map((balance) => {
            const accordionId = balance.productId.toString();
            const isPositiveBalance = balance.balanceAmount.gt(0);

            const metrics = (
              <>
                <LineItem.Metric
                  label="Oracle Price"
                  renderValue={balance.priceFormatSpecifier}
                  value={balance.oraclePrice}
                />
                <LineItem.Metric
                  label="Balance"
                  renderValue={CustomNumberFormatSpecifier.NUMBER_PRECISE}
                  value={balance.balanceAmount}
                  valueEndElement={balance.symbol}
                />
                <LineItem.Metric
                  label="Value"
                  renderValue={PresetNumberFormatSpecifier.CURRENCY_2DP}
                  value={balance.balanceValueUsd}
                />
                {!balance.lpBalanceValueUsd.isZero() && (
                  <LineItem.Metric
                    label="LP Value"
                    renderValue={PresetNumberFormatSpecifier.CURRENCY_2DP}
                    value={balance.lpBalanceValueUsd}
                  />
                )}
              </>
            );

            return (
              <PreLiquidationBalanceAccordionItem
                key={accordionId}
                value={accordionId}
                active={openAccordionIds.includes(accordionId)}
                productIconSrc={balance.iconSrc}
                productName={balance.productName}
                sideLabel={isPositiveBalance ? 'DEPOSIT' : 'BORROW'}
                isPositiveBalance={isPositiveBalance}
                metrics={metrics}
              />
            );
          })}
          {/*Perp positions*/}
          {perpBalances?.map((balance) => {
            const accordionId = balance.productId.toString();
            const isPositiveBalance = balance.balanceAmount.gt(0);

            const metrics = (
              <>
                <LineItem.Metric
                  label="Oracle Price"
                  renderValue={balance.priceFormatSpecifier}
                  value={balance.oraclePrice}
                />
                <LineItem.Metric
                  label="Balance"
                  renderValue={balance.sizeFormatSpecifier}
                  value={balance.balanceAmount}
                  valueEndElement={balance.symbol}
                />
                <LineItem.Metric
                  label="Unrealized PnL"
                  renderValue={PresetNumberFormatSpecifier.CURRENCY_2DP}
                  value={balance.unrealizedPnlUsd}
                  valueClassName={signDependentValue(balance.unrealizedPnlUsd, {
                    positive: 'text-positive',
                    negative: 'text-negative',
                    zero: 'text-text-secondary',
                  })}
                />
                <LineItem.Metric
                  label="Unsettled"
                  renderValue={PresetNumberFormatSpecifier.NUMBER_2DP}
                  value={balance.unsettledQuote}
                  valueEndElement={PRIMARY_QUOTE_SYMBOL}
                />
              </>
            );

            return (
              <PreLiquidationBalanceAccordionItem
                key={accordionId}
                value={accordionId}
                active={openAccordionIds.includes(accordionId)}
                productIconSrc={balance.iconSrc}
                productName={balance.productName}
                sideLabel={isPositiveBalance ? 'LONG' : 'SHORT'}
                isPositiveBalance={isPositiveBalance}
                metrics={metrics}
              />
            );
          })}
        </Accordion.Root>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
