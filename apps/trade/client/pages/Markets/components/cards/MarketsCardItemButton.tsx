import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import {
  Button,
  getStateOverlayClassNames,
  SizeVariant,
} from '@vertex-protocol/web-ui';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import Link from 'next/link';

type Props = ValueWithLabelProps & {
  valueWithLabelClassName?: string;
  href?: string;
  onClick?: () => void;
};

export function MarketsCardItemButton({
  href,
  onClick,
  className,
  sizeVariant,
  valueWithLabelClassName,
  labelClassName,
  ...rest
}: Props) {
  const hoverStateOverlayClassName = getStateOverlayClassNames({
    borderRadiusVariant: 'sm',
  });

  const buttonClassNames = joinClassNames(
    'h-max items-center justify-stretch p-2',
    hoverStateOverlayClassName,
    className,
  );

  const valueWithLabelProps: ValueWithLabelProps = {
    className: mergeClassNames(
      'flex-1 flex-col sm:flex-row items-stretch',
      valueWithLabelClassName,
    ),
    labelClassName: joinClassNames('text-text-primary', labelClassName),
    sizeVariant: sizeVariant ?? ('xs' as SizeVariant),
    ...rest,
  };

  if (!!href) {
    return (
      <Button className={buttonClassNames} as={Link} href={href}>
        <ValueWithLabel.Horizontal {...valueWithLabelProps} />
      </Button>
    );
  }

  return (
    <Button className={buttonClassNames} onClick={onClick}>
      <ValueWithLabel.Horizontal {...valueWithLabelProps} />
    </Button>
  );
}
