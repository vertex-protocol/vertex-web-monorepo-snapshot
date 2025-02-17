import * as Tabs from '@radix-ui/react-tabs';
import { PrimaryButton, SegmentedControl } from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { PerpMarginModeCrossTabContent } from 'client/pages/PerpTrading/components/PerpMarginModeDialog/PerpMarginModeCrossTabContent';
import { PerpMarginModeIsolatedTabContent } from 'client/pages/PerpTrading/components/PerpMarginModeDialog/PerpMarginModeIsolatedTabContent';
import { usePerpMarginModeDialog } from 'client/pages/PerpTrading/components/PerpMarginModeDialog/usePerpMarginModeDialog';

export interface PerpMarginModeDialogParams {
  productId: number;
}

export function PerpMarginModeDialog({
  productId,
}: PerpMarginModeDialogParams) {
  const {
    hide,
    currentMarket,
    enableIsoBorrows,
    leverage,
    marginModeTabs,
    onSaveClick,
    selectedMarginModeTabId,
    setEnableIsoBorrows,
    setLeverage,
    setSelectedMarginModeTabId,
  } = usePerpMarginModeDialog({ productId });

  const tabClassNames = 'flex flex-col gap-y-4 empty:hidden';

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Margin Mode</BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <Tabs.Root
          className="flex flex-col gap-y-4"
          value={selectedMarginModeTabId}
          onValueChange={setSelectedMarginModeTabId}
        >
          <Tabs.List asChild>
            <SegmentedControl.Container>
              {marginModeTabs.map(({ id }) => {
                const isSelected = id === selectedMarginModeTabId;
                return (
                  <Tabs.Trigger value={id} key={id} asChild>
                    <SegmentedControl.Button
                      active={isSelected}
                      className="flex-1 capitalize"
                    >
                      {id}
                    </SegmentedControl.Button>
                  </Tabs.Trigger>
                );
              })}
            </SegmentedControl.Container>
          </Tabs.List>
          <Tabs.Content
            value={'isolated' satisfies MarginModeType}
            className={tabClassNames}
          >
            <PerpMarginModeIsolatedTabContent
              currentMarket={currentMarket}
              leverage={leverage}
              enableIsoBorrows={enableIsoBorrows}
              setLeverage={setLeverage}
              setEnableIsoBorrows={setEnableIsoBorrows}
            />
          </Tabs.Content>
          <Tabs.Content
            value={'cross' satisfies MarginModeType}
            className={tabClassNames}
          >
            <PerpMarginModeCrossTabContent
              currentMarket={currentMarket}
              leverage={leverage}
              setLeverage={setLeverage}
            />
          </Tabs.Content>
        </Tabs.Root>
        <PrimaryButton onClick={onSaveClick}>Save</PrimaryButton>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
