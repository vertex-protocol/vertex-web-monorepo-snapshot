import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  RadioGroup,
  RadioGroupCardProps,
  RadioGroupRootProps,
} from '@vertex-protocol/web-ui';
import { UnstakeRadioId } from 'client/modules/staking/dialogs/UnstakeV2VrtxDialog/useUnstakeV2VrtxDialog';

interface Props {
  selectedRadioId: UnstakeRadioId;
  setSelectedRadioId: (id: UnstakeRadioId) => void;
  unstakedLockPeriodDays: BigDecimal | undefined;
  instantUnstakeReceivedAmountFraction: BigDecimal | undefined;
  instantUnstakeBurnAmountFraction: BigDecimal | undefined;
  disableButtons: boolean;
}

export function UnstakeV2VrtxRadioGroup({
  disableButtons,
  instantUnstakeBurnAmountFraction,
  instantUnstakeReceivedAmountFraction,
  selectedRadioId,
  setSelectedRadioId,
  unstakedLockPeriodDays,
}: Props) {
  const formattedUnstakedLockPeriodDays = formatNumber(unstakedLockPeriodDays, {
    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
  });
  const formattedInstantUnstakeBurnAmountFraction = formatNumber(
    instantUnstakeBurnAmountFraction,
    {
      formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_INT,
    },
  );
  const formattedInstantUnstakeReceivedAmountFraction = formatNumber(
    instantUnstakeReceivedAmountFraction,
    {
      formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_INT,
    },
  );

  return (
    <Root
      value={selectedRadioId}
      onValueChange={setSelectedRadioId}
      disabled={disableButtons}
    >
      <Card
        active={selectedRadioId === 'standard'}
        title="Standard"
        value="standard"
        description={`Wait ${formattedUnstakedLockPeriodDays} days without earning yield before you can withdraw your tokens.`}
        disabled={disableButtons}
      />
      <Card
        active={selectedRadioId === 'instant'}
        title="Instant"
        value="instant"
        description={`Get ${formattedInstantUnstakeReceivedAmountFraction} of your tokens immediately, but ${formattedInstantUnstakeBurnAmountFraction} will be burned.`}
        disabled={disableButtons}
      />
    </Root>
  );
}

function Root(props: RadioGroupRootProps<UnstakeRadioId>) {
  return <RadioGroup.Root className="flex gap-x-2" {...props} />;
}

interface CardProps extends RadioGroupCardProps<UnstakeRadioId> {
  description: string;
}

function Card({ description, value, active, ...radioItemProps }: CardProps) {
  return (
    <RadioGroup.Card
      value={value}
      active={active}
      className="flex-1 whitespace-normal"
      {...radioItemProps}
    >
      {description}
    </RadioGroup.Card>
  );
}
