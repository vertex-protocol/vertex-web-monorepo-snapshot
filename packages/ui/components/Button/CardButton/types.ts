import { ReactNode } from 'react';
import { Except } from 'type-fest';
import { CardButtonBaseProps } from './CardButton';
import { IconType } from '../../Icons';

export type NavCardBaseProps = Except<
  CardButtonBaseProps,
  'startIcon' | 'endIcon' | 'title'
> & {
  title: ReactNode;
  icon?: IconType;
  contentClassName?: string;
  description: ReactNode;
};
