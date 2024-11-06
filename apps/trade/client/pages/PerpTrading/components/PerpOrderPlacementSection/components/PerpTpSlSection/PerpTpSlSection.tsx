import { PerpTpSlCheckbox } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpTpSlSection/PerpTpSlCheckbox';
import { PerpTpSlOrderForm } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpTpSlSection/PerpTpSlOrderForm';
import { PerpTpSlWarningPanel } from 'client/pages/PerpTrading/components/PerpOrderPlacementSection/components/PerpTpSlSection/PerpTpSlWarningPanel';
import { usePerpOrderFormContext } from 'client/pages/PerpTrading/context/PerpOrderFormContext';

export function PerpTpSlSection() {
  const {
    isTpSlCheckboxChecked,
    setIsTpSlCheckboxChecked,
    isTpSlCheckboxDisabled,
    takeProfitOrderForm,
    stopLossOrderForm,
    hasExistingPosition,
    hasExistingTriggerOrder,
  } = usePerpOrderFormContext();

  return (
    <div className="flex flex-col gap-y-2.5">
      <PerpTpSlCheckbox
        isChecked={isTpSlCheckboxChecked}
        setIsChecked={setIsTpSlCheckboxChecked}
        isDisabled={isTpSlCheckboxDisabled}
      />
      {isTpSlCheckboxChecked && (
        <>
          <PerpTpSlOrderForm perpTpSlOrderForm={takeProfitOrderForm} />
          <PerpTpSlOrderForm perpTpSlOrderForm={stopLossOrderForm} />
          <PerpTpSlWarningPanel
            hasExistingPosition={hasExistingPosition}
            hasExistingTriggerOrder={hasExistingTriggerOrder}
          />
        </>
      )}
    </div>
  );
}
