import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { PrivacyToggleButton } from 'client/components/PrivacyToggleIcon';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { PRIVACY_BLUR_CLASSNAME } from 'client/modules/privacy/consts';
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

interface ItemsProps extends WithClassnames<WithChildren> {
  header?: ReactNode;
  childContainerClassNames?: string;
}

function Items({
  className,
  children,
  header,
  childContainerClassNames,
}: ItemsProps) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-2', className)}>
      {!!header && (
        <>
          <div className="text-text-primary text-sm">{header}</div>
          <Divider />
        </>
      )}
      <div className={childContainerClassNames}>{children}</div>
    </div>
  );
}

function Item({ valueClassName, ...rest }: ValueWithLabelProps) {
  const [areAccountValuesPrivate] = usePrivacySetting(
    'areAccountValuesPrivate',
  );

  return (
    <ValueWithLabel.Horizontal
      sizeVariant="sm"
      valueClassName={joinClassNames(
        areAccountValuesPrivate && PRIVACY_BLUR_CLASSNAME,
        valueClassName,
      )}
      {...rest}
    />
  );
}

export const PortfolioHeroMetricsPane = {
  Header,
  Items,
  ValueWithLabel: Item,
};
