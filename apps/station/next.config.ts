import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push(
      'utf-8-validate',
      'bufferutil',
      'encoding',
      'pino-pretty',
    );
    return config;
  },
  devIndicators: {
    appIsrStatus: false,
  },
  experimental: {
    optimizePackageImports: [
      '@vertex-protocol/react-client',
      '@vertex-protocol/web-common',
      '@vertex-protocol/web-ui',
    ],
  },
};

export default nextConfig;
