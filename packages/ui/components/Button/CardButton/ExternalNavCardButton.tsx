import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '../../Icons';
import { CardButton } from './CardButton';
import { NavCardButtonContent } from './NavCardButtonContent';
import { NavCardBaseProps } from './types';

export function ExternalNavCardButton({
  icon: Icon,
  className,
  title,
  description,
  contentClassName,
  ...rest
}: NavCardBaseProps) {
  return (
    <CardButton
      className={joinClassNames('rounded p-4', className)}
      startIcon={
        Icon ? <Icon className="text-text-primary" size={24} /> : undefined
      }
      stateOverlayBorderRadiusVariant="base"
      endIcon={
        <Icons.PiArrowUpRight size={20} className="text-text-tertiary" />
      }
      {...rest}
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
