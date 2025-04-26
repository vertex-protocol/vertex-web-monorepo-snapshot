import {
  WithChildren,
  WithClassnames,
  joinClassNames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { PrivacyToggleButton } from 'client/components/PrivacyToggleIcon';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ReactNode } from 'react';

interface HeaderProps extends WithClassnames {
  title: ReactNode;
  valueContent: ReactNode;
  changeContent?: ReactNode;
  definitionTooltipId?: DefinitionTooltipID;
}

function Header({
  className,
  title,
  valueContent,
  changeContent,
  definitionTooltipId,
}: HeaderProps) {
  const [areAccountValuesPrivate, setAreAccountValuesPrivate] =
    usePrivacySetting('areAccountValuesPrivate');

  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-y-2 sm:gap-y-1.5',
        className,
      )}
    >
      <div className="flex items-center gap-x-1.5">
        <DefinitionTooltip
          definitionId={definitionTooltipId}
          contentWrapperClassName="text-xs sm:text-sm text-text-tertiary"
        >
          {title}
        </DefinitionTooltip>
        <PrivacyToggleButton
          colorVariant="tertiary"
          isPrivate={areAccountValuesPrivate}
          onClick={() => setAreAccountValuesPrivate(!areAccountValuesPrivate)}
        />
      </div>
      <div className="flex flex-col">
        <PrivateContent
          isPrivate={areAccountValuesPrivate}
          className="text-text-primary text-xl sm:text-3xl"
        >
          {valueContent}
        </PrivateContent>
        {changeContent ?? null}
      </div>
    </div>
  );
}

interface ItemsGroupProps extends WithChildren {
  header?: ReactNode;
  headerClassName?: string;
}

function ItemsGroup({ children, header, headerClassName }: ItemsGroupProps) {
  return (
    <div className="flex flex-col gap-y-1">
      {header && (
        <div
          className={mergeClassNames(
            'flex items-center gap-x-2.5 pb-0.5',
            'text-text-primary text-sm',
            'border-overlay-divider border-b',
            headerClassName,
          )}
        >
          {header}
        </div>
      )}
      {children}
    </div>
  );
}

function ItemsGroupContainer({
  className,
  children,
}: WithClassnames<WithChildren>) {
  return (
    <div className={mergeClassNames('flex flex-col gap-y-6', className)}>
      {children}
    </div>
  );
}

function Item({ sizeVariant, ...rest }: ValueWithLabelProps) {
  const [areAccountValuesPrivate] = usePrivacySetting(
    'areAccountValuesPrivate',
  );

  return (
    <ValueWithLabel.Horizontal
      sizeVariant={sizeVariant ?? 'sm'}
      isValuePrivate={areAccountValuesPrivate}
      {...rest}
    />
  );
}

export const PortfolioHeroMetricsPane = {
  Header,
  ItemsGroup,
  ItemsGroupContainer,
  ValueWithLabel: Item,
};
