import { ChainEnv } from '@vertex-protocol/client';
import {
  AnnotatedPerpMarket,
  AnnotatedSpotMarket,
  EdgeChainEnv,
} from '@vertex-protocol/react-client';

export type ChartTimespanDays = 7 | 30 | 90;

// This is important such that we can label Spot markets with their associated `chainEnv`.
interface EdgeSpotMetadata {
  chainEnv: ChainEnv;
}

// Perp markets have `edge` as their `chainEnv`.
interface EdgePerpMetadata {
  chainEnv: EdgeChainEnv;
}

export type EdgeAnnotatedSpotMarket = AnnotatedSpotMarket & EdgeSpotMetadata;

export type EdgeAnnotatedPerpMarket = AnnotatedPerpMarket & EdgePerpMetadata;

export type EdgeAnnotatedMarket =
  | EdgeAnnotatedSpotMarket
  | EdgeAnnotatedPerpMarket;
