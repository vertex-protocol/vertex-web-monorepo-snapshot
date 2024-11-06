// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
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

  images: {},
  experimental: {
    optimizePackageImports: [
      '@vertex-protocol/react-client',
      '@vertex-protocol/web-common',
      '@vertex-protocol/web-ui',
    ],
  },
};
