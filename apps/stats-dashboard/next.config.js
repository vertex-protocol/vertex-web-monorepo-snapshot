/** @type {import('next').NextConfig} */
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
  transpilePackages: ['common', 'data'],
};

module.exports = nextConfig;
