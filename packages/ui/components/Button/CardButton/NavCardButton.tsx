import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import { CardButton, Icons, NavCardBaseProps } from '@vertex-protocol/web-ui';
import { NavCardButtonContent } from './NavCardButtonContent';
import { NavCardButtonStartIcon } from './NavCardButtonStartIcon';

type Props = NavCardBaseProps & {
  active?: boolean;
};

export function NavCardButton({
  className,
  children: baseChildren,
  title,
  description,
  icon,
  active,
  contentClassName,
  ...rest
}: Props) {
  return (
    <CardButton
      className={mergeClassNames(
        'bg-transparent px-2 py-1.5 shadow-none ring-0',
        active && 'bg-overlay-hover/5',
        className,
      )}
      startIcon={<NavCardButtonStartIcon icon={icon} />}
      endIcon={
        <Icons.FiChevronRight size={20} className="text-text-tertiary" />
      }
      {...rest}
    >
      <NavCardButtonContent
        title={title}
        description={description}
        className={joinClassNames('flex-1', contentClassName)}
      />
    </CardButton>
  );
}
