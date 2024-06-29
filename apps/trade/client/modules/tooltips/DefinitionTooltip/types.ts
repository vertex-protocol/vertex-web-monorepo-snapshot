import { Token } from 'common/productMetadata/types';
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
