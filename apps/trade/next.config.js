// @ts-check

const { withSentryConfig } = require('@sentry/nextjs');

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // Similar strategy as https://github.com/vercel/next.js/issues/44273
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // Silences the "cannot resolve module" warning for these modules
      'utf-8-validate': false,
      bufferutil: false,
    };

    return config;
  },
  // Without this, Next.js is unable to resolve imports from the common package
  transpilePackages: [],
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
};

module.exports = withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options
    // Suppresses source map uploading logs during build
    silent: true,
    org: 'vertex-protocol',
    project: 'frontend-trade',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: false,
    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',
    // Hides source maps from generated client bundles
    hideSourceMaps: true,
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
);
