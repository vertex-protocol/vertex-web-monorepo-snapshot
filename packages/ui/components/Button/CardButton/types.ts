import { ReactNode } from 'react';
import { Except } from 'type-fest';
import { IconComponent } from '../../Icons';
import { CardButtonBaseProps } from './CardButton';

export type NavCardBaseProps = Except<
  CardButtonBaseProps,
  'startIcon' | 'endIcon' | 'title'
> & {
  title: ReactNode;
  icon?: IconComponent;
  contentClassName?: string;
  description?: ReactNode;
};
