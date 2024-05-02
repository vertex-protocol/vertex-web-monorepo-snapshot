import { RadioGroup, RadioGroupCardProps } from '@vertex-protocol/web-ui';
import { SubaccountSigningPreferenceType } from 'client/modules/singleSignatureSessions/types';
import { ReactNode } from 'react';

interface Props extends RadioGroupCardProps<SubaccountSigningPreferenceType> {
  description: string;
  listContent: ReactNode;
}

function Card({ description, listContent, ...rest }: Props) {
  return (
    <RadioGroup.Card {...rest}>
      <div className="flex flex-col gap-y-4">
        <p className="text-text-tertiary whitespace-normal text-xs">
          {description}
        </p>
        <div className="flex flex-col gap-y-2">{listContent}</div>
      </div>
    </RadioGroup.Card>
  );
}

function CardListItem({
  description,
  icon,
}: {
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center gap-x-1.5 text-xs">
      {icon}
      <div className="text-text-tertiary">{description}</div>
    </div>
  );
}

export const SignatureModeRadioGroup = {
  Root: RadioGroup.Root,
  Card,
  CardListItem,
};
