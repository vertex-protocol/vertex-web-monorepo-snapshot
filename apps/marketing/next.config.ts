import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/spindl-ingest/:path*',
        destination: 'https://spindl.link/:path*',
      },
    ];
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'encoding');
    return config;
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
