// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'encoding');
    return config;
  },
  experimental: {
    optimizePackageImports: [
      '@vertex-protocol/react-client',
      '@vertex-protocol/web-common',
    ],
  },
};
