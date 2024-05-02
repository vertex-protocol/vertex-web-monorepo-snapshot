// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  // Without this, Next.js is unable to resolve imports from the common package
  transpilePackages: [],
  images: {
    domains: ['blog.vertexprotocol.com'],
  },
};
