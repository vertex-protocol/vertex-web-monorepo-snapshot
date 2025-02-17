import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'encoding');
    return config;
  },
  devIndicators: {
    appIsrStatus: false,
  },
  experimental: {
    optimizePackageImports: ['@vertex-protocol/web-common'],
  },
};

export default nextConfig;
