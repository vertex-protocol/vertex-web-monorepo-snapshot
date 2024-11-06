const brandName = require('./common/environment/envBrandName');

const siteUrl = {
  vertex: 'https://app.vertexprotocol.com',
  blitz: 'https://app.blitz.exchange',
}[brandName];

const brandSpecificExcludedPaths = {
  vertex: [],
  blitz: ['/vrtx', '/referrals'],
}[brandName];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [...brandSpecificExcludedPaths, '/competitions/*'],
  additionalPaths: async (config) => {
    const transformedPaths = [];
    for (const path of ['/spot', '/perpetuals']) {
      transformedPaths.push(await config.transform(config, path));
    }

    return transformedPaths;
  },
};
