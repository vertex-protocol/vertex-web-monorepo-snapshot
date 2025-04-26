import envBrandName from 'common/environment/envBrandName';
import { BrandName } from 'common/environment/types';

export type DataEnv =
  | 'local'
  | 'vertexTestnet'
  | 'vertexMainnet'
  | 'blitzTestnet'
  | 'blitzMainnet';

export interface BaseClientEnv {
  // Determines supported chains to interact with
  dataEnv: DataEnv;
  // Determines app branding
  brandName: BrandName;
  // Enables any WIP / experimental features
  enableExperimentalFeatures: boolean;
  // An identifier for the current build
  buildId: string;
}

const dataEnv: DataEnv =
  (process.env.NEXT_PUBLIC_DATA_ENV as DataEnv) ?? 'vertexTestnet';

const brandName = envBrandName;

export const baseClientEnv: BaseClientEnv = {
  enableExperimentalFeatures:
    process.env.NEXT_PUBLIC_ENABLE_EXPERIMENTAL_FEATURES === 'true',
  dataEnv,
  brandName,
  buildId: process.env.NEXT_PUBLIC_BUILD_ID ?? 'dev',
};
