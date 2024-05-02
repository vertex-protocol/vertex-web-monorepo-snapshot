import Link from 'next/link';
import React, { ComponentProps, ReactNode } from 'react';

export type ButtonColorType = 'green' | 'purple' | 'orange';
export type ButtonColorHue = 'light' | 'dark' | 'primary';
export type ButtonElement = typeof Link | 'button' | 'div';

interface BaseButtonProps<E extends ButtonElement> {
  as?: E;
  ref?: React.Ref<E>;
  variant?: ButtonColorType;
  hue?: ButtonColorHue;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
  external?: boolean;
  iconClassName?: string;
  isLoading?: boolean;
}

export type ButtonProps<E extends ButtonElement = 'button'> =
  BaseButtonProps<E> & Omit<ComponentProps<E>, keyof BaseButtonProps<E>>;
