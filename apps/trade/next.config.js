// @ts-check

const { withSentryConfig } = require('@sentry/nextjs');
const nextBuildId = require('next-build-id');

// use first 7 characters of git commit hash as build id
const buildId = nextBuildId.sync({ dir: __dirname }).substring(0, 7);

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push(
      // This is currently needed to load the *.wasm files needed for Notifi
      '@xmtp/user-preferences-bindings-wasm',
      'utf-8-validate',
      'bufferutil',
      'encoding',
      'pino-pretty',
    );
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/portfolio/overview',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/portfolio/overview',
        permanent: true,
      },
    ];
  },
  generateBuildId: () => buildId,
  env: {
    NEXT_PUBLIC_BUILD_ID: buildId,
  },
  experimental: {
    optimizePackageImports: [
      '@vertex-protocol/react-client',
      '@vertex-protocol/web-common',
      '@vertex-protocol/web-ui',
    ],
  },
};

module.exports = withSentryConfig(
  nextConfig,
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  {
    // Suppresses source map uploading logs during build
    silent: true,
    org: 'vertex-protocol',
    project: 'frontend-trade',
    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',
    // Hides source maps from generated client bundles
    hideSourceMaps: true,
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
);
