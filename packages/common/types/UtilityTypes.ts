import { ReactNode, RefAttributes } from 'react';

export type WithClassnames<T = {}> = T & { className?: string };

export type WithChildren<T = {}> = T & { children?: ReactNode };

export type WithRef<T = {}, R = HTMLElement> = T & RefAttributes<R>;
