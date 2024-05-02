import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { Except } from 'type-fest';
import { CardButtonBaseProps } from './CardButton';

export type NavCardBaseProps = Except<
  CardButtonBaseProps,
  'endIcon' | 'startIcon' | 'title'
> & {
  icon?: IconType;
  title: ReactNode;
  contentClassName?: string;
  description: ReactNode;
};
