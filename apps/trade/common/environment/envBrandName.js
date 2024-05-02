// This needs to be in JS so that we can use it in `next-sitemap`
const envBrandName = process.env.NEXT_PUBLIC_BRAND_NAME ?? 'vertex';

module.exports = envBrandName;
