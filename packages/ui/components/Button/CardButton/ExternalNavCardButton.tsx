import { joinClassNames } from '@vertex-protocol/web-common';
import { CardButton, Icons } from '@vertex-protocol/web-ui';
import { NavCardButtonContent } from './NavCardButtonContent';
import { NavCardButtonStartIcon } from './NavCardButtonStartIcon';
import { NavCardBaseProps } from './types';

export function ExternalNavCardButton({
  icon,
  className,
  title,
  disabled,
  description,
  contentClassName,
  ...buttonProps
}: NavCardBaseProps) {
  return (
    <CardButton
      className={joinClassNames('p-4', className)}
      startIcon={<NavCardButtonStartIcon icon={icon} />}
      endIcon={
        <Icons.PiArrowUpRight size={20} className="text-text-tertiary" />
      }
      {...buttonProps}
    >
      <NavCardButtonContent
        className={joinClassNames('flex-1', contentClassName)}
        title={title}
        description={description}
        titleClassName="text-base"
        descriptionClassName="text-sm"
      />
    </CardButton>
  );
}
