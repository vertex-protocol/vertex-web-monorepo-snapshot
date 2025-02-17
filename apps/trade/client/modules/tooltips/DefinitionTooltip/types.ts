import { Token } from '@vertex-protocol/react-client';
import { ReactNode } from 'react';

export interface DefinitionTooltipContent {
  title: ReactNode;
  content: ReactNode;
}

export interface DefinitionTooltipContext {
  primaryQuoteToken: Token;
}

export type DefinitionTooltipConfig =
  | DefinitionTooltipContent
  | ((context: DefinitionTooltipContext) => DefinitionTooltipContent);
