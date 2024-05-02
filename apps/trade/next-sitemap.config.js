const brandName = require('./common/environment/envBrandName');

const siteUrl = {
  vertex: 'https://app.vertexprotocol.com',
  blitz: 'https://app.blitz.exchange',
}[brandName];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  additionalPaths: async (config) => {
    // Dynamic paths aren't picked up by the tool, so needs to be manually specified
    const paths = [
      '/portfolio/overview',
      '/portfolio/balances',
      '/portfolio/positions',
      '/portfolio/lp-positions',
      '/portfolio/orders',
      '/portfolio/history',
      '/portfolio/margin-manager',
      '/portfolio/faq',
      '/spot',
      '/perpetuals',
    ];

    const transformedPaths = [];
    for (const path of paths) {
      transformedPaths.push(await config.transform(config, path));
    }

    return transformedPaths;
  },
};
