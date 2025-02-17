import * as Accordion from '@radix-ui/react-accordion';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
  signDependentValue,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { useCopyText } from '@vertex-protocol/web-common';
import {
  formatTimestamp,
  Spinner,
  TextButton,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { PreLiquidationBalanceAccordionItem } from 'client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/PreLiquidationBalanceAccordionItem';
import { PreLiquidationDetailsDialogParams } from 'client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/types';
import { usePreLiquidationDetailsDialog } from 'client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/usePreLiquidationDetailsDialog';
import { useState } from 'react';

export function PreLiquidationDetailsDialog(
  params: PreLiquidationDetailsDialogParams,
) {
  const { primaryQuoteToken } = useVertexMetadataContext();
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
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Pre-Liquidation Balances
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
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
            <TextButton colorVariant="secondary" onClick={onCopyJsonClick}>
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
            const isolatedPerpProduct = balance.isolatedPerpProduct;
            const accordionId = `${balance.productId}_${isolatedPerpProduct?.productId}`;
            const isPositiveBalance = balance.balanceAmount.gt(0);
            const productNameWithMarginMode = getProductNameWithMarginMode(
              balance.productName,
              balance.marginModeType,
            );

            const metrics = (
              <>
                <ValueWithLabel.Horizontal
                  sizeVariant="xs"
                  label="Type"
                  valueClassName="capitalize"
                  valueContent={balance.marginModeType}
                />
                {isolatedPerpProduct && (
                  <ValueWithLabel.Horizontal
                    sizeVariant="xs"
                    label="Position"
                    valueContent={
                      balance.isolatedPerpProduct?.metadata.marketName
                    }
                  />
                )}
                <ValueWithLabel.Horizontal
                  sizeVariant="xs"
                  label="Oracle Price"
                  numberFormatSpecifier={balance.priceFormatSpecifier}
                  value={balance.oraclePrice}
                />
                <ValueWithLabel.Horizontal
                  sizeVariant="xs"
                  label="Balance"
                  numberFormatSpecifier={
                    CustomNumberFormatSpecifier.NUMBER_PRECISE
                  }
                  value={balance.balanceAmount}
                  valueEndElement={balance.symbol}
                />
                <ValueWithLabel.Horizontal
                  sizeVariant="xs"
                  label="Value"
                  numberFormatSpecifier={
                    PresetNumberFormatSpecifier.CURRENCY_2DP
                  }
                  value={balance.balanceValueUsd}
                />
                {!balance.lpBalanceValueUsd.isZero() && (
                  <ValueWithLabel.Horizontal
                    sizeVariant="xs"
                    label="LP Value"
                    numberFormatSpecifier={
                      PresetNumberFormatSpecifier.CURRENCY_2DP
                    }
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
                productName={productNameWithMarginMode}
                sideLabel={isPositiveBalance ? 'DEPOSIT' : 'BORROW'}
                isPositiveBalance={isPositiveBalance}
                metrics={metrics}
              />
            );
          })}
          {/*Perp positions*/}
          {perpBalances?.map((balance) => {
            const accordionId = `${balance.marginModeType}_${balance.productId}`;
            const isPositiveBalance = balance.balanceAmount.gt(0);
            const productNameWithMarginMode = getProductNameWithMarginMode(
              balance.productName,
              balance.marginModeType,
            );

            const metrics = (
              <>
                <ValueWithLabel.Horizontal
                  sizeVariant="xs"
                  label="Type"
                  valueClassName="capitalize"
                  valueContent={balance.marginModeType}
                />
                <ValueWithLabel.Horizontal
                  sizeVariant="xs"
                  label="Oracle Price"
                  numberFormatSpecifier={balance.priceFormatSpecifier}
                  value={balance.oraclePrice}
                />
                <ValueWithLabel.Horizontal
                  sizeVariant="xs"
                  label="Balance"
                  numberFormatSpecifier={balance.sizeFormatSpecifier}
                  value={balance.balanceAmount}
                  valueEndElement={balance.symbol}
                />
                <ValueWithLabel.Horizontal
                  sizeVariant="xs"
                  label="Unrealized PnL"
                  numberFormatSpecifier={
                    PresetNumberFormatSpecifier.CURRENCY_2DP
                  }
                  value={balance.unrealizedPnlUsd}
                  valueClassName={signDependentValue(balance.unrealizedPnlUsd, {
                    positive: 'text-positive',
                    negative: 'text-negative',
                    zero: 'text-text-secondary',
                  })}
                />
                <ValueWithLabel.Horizontal
                  sizeVariant="xs"
                  label="Unsettled"
                  numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
                  value={balance.unsettledQuote}
                  valueEndElement={primaryQuoteToken.symbol}
                />
              </>
            );

            return (
              <PreLiquidationBalanceAccordionItem
                key={accordionId}
                value={accordionId}
                active={openAccordionIds.includes(accordionId)}
                productIconSrc={balance.iconSrc}
                productName={productNameWithMarginMode}
                sideLabel={isPositiveBalance ? 'LONG' : 'SHORT'}
                isPositiveBalance={isPositiveBalance}
                metrics={metrics}
              />
            );
          })}
        </Accordion.Root>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}

function getProductNameWithMarginMode(
  productName: string,
  marginModeType: MarginModeType,
) {
  return `${productName} (${marginModeType === 'isolated' ? 'Iso' : 'Cross'})`;
}
