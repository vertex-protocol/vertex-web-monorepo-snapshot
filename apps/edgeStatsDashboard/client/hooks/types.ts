import { ChainEnv } from '@vertex-protocol/client';
import {
  AnnotatedPerpMarket,
  AnnotatedSpotMarket,
} from '@vertex-protocol/react-client';

type EdgeChainEnv = 'edge';

export type ChartTimespanDays = 7 | 30 | 90;

export type ChainEnvWithEdge = ChainEnv | EdgeChainEnv;

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
