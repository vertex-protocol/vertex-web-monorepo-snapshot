import { ReactNode } from 'react';

export type WithClassnames<T = {}> = T & { className?: string };

export type WithChildren<T = {}> = T & { children?: ReactNode };
