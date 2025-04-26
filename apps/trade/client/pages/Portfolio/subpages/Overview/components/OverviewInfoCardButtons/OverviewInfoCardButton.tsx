import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { CardButton, Value } from '@vertex-protocol/web-ui';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props extends WithClassnames {
  href: string;
  title: ReactNode;
  value: ReactNode;
  pill: ReactNode;
  isPrivate: boolean;
  valueClassName?: string;
  titleDefinitionId?: DefinitionTooltipID;
}

export function OverviewInfoCardButton({
  className,
  href,
  title,
  value,
  valueClassName,
  pill,
  titleDefinitionId,
  isPrivate,
}: Props) {
  return (
    <CardButton
      as={Link}
      href={href}
      className={joinClassNames(
        'flex flex-col items-start',
        'gap-y-2 p-4',
        className,
      )}
    >
      <div className="flex w-full items-start justify-between">
        <DefinitionTooltip
          decoration={{ icon: true }}
          definitionId={titleDefinitionId}
          contentWrapperClassName="text-sm text-text-tertiary"
        >
          {title}
        </DefinitionTooltip>
        {pill}
      </div>
      <Value
        sizeVariant="lg"
        className={valueClassName}
        isValuePrivate={isPrivate}
      >
        {value}
      </Value>
    </CardButton>
  );
}
