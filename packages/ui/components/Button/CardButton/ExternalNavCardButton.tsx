import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '../../Icons';
import { CardButton } from './CardButton';
import { NavCardButtonContent } from './NavCardButtonContent';
import { NavCardBaseProps } from './types';

export function ExternalNavCardButton({
  title,
  description,
  icon,
  className,
  contentClassName,
  ...rest
}: NavCardBaseProps) {
  return (
    <CardButton
      className={joinClassNames('rounded px-4 py-3', className)}
      stateOverlayBorderRadiusVariant="base"
      endIcon={<Icons.ArrowUpRight size={20} className="text-text-tertiary" />}
      {...rest}
    >
      <NavCardButtonContent
        icon={icon}
        className={joinClassNames('flex-1 gap-y-0.5', contentClassName)}
        title={title}
        description={description}
        titleClassName="text-base"
        descriptionClassName="text-xs"
        iconClassName="h-4"
      />
    </CardButton>
  );
}
