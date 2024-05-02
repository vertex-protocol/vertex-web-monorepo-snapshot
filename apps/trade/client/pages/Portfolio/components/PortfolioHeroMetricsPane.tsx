import { BigDecimal } from '@vertex-protocol/client';
import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { LineItem } from 'client/components/LineItem/LineItem';
import { LineItemMetricProps } from 'client/components/LineItem/types';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { PRIVACY_BLUR_CLASSNAME } from 'client/modules/privacy/consts';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { ReactNode } from 'react';
import { PortfolioPrivacyToggleButton } from './PortfolioPrivacyToggleButton';

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
  const [areAccountValuesPrivate] = usePrivacySetting(
    'areAccountValuesPrivate',
  );
  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-y-2 sm:gap-y-1.5',
        className,
      )}
    >
      <div className="flex items-center gap-x-2">
        <DefinitionTooltip
          definitionId={definitionTooltipId}
          contentWrapperClassName="text-xs sm:text-sm text-text-tertiary"
        >
          {title}
        </DefinitionTooltip>
        <PortfolioPrivacyToggleButton />
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

function Items({
  className,
  children,
  header,
  childContainerClassNames,
}: WithClassnames<
  WithChildren<{ header: ReactNode; childContainerClassNames?: string }>
>) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-2 text-sm', className)}>
      <div className="text-text-primary">{header}</div>
      <Divider />
      <div className={childContainerClassNames}>{children}</div>
    </div>
  );
}

function Item<TValue = BigDecimal>({
  className,
  valueClassName,
  ...rest
}: LineItemMetricProps<TValue>) {
  const [areAccountValuesPrivate] = usePrivacySetting(
    'areAccountValuesPrivate',
  );
  return (
    <LineItem.Metric
      className={joinClassNames('text-2xs sm:text-xs', className)}
      valueClassName={joinClassNames(
        'text-2xs sm:text-xs',
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
  LineItem: Item,
};
