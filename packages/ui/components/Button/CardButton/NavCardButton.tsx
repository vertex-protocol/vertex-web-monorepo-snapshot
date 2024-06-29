import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import { getStateOverlayClassNames } from '../../../utils';
import { CARD_CLASSNAMES } from '../../Card';
import { Icons } from '../../Icons';
import { Button } from '../Button';
import { NavCardButtonContent } from './NavCardButtonContent';
import { NavCardBaseProps } from './types';

type Props = NavCardBaseProps & {
  active?: boolean;
};

export function NavCardButton({
  className,
  children: baseChildren,
  title,
  icon: Icon,
  description,
  active,
  contentClassName,
  ...rest
}: Props) {
  const stateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'lg',
    disabled: rest.disabled,
    active,
  });

  return (
    <Button
      className={mergeClassNames(
        CARD_CLASSNAMES,
        'relative bg-transparent px-2 py-1.5 shadow-none ring-0',
        stateOverlayClassNames,
        className,
      )}
      startIcon={
        Icon ? <Icon className="text-text-primary" size={24} /> : undefined
      }
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
    </Button>
  );
}
