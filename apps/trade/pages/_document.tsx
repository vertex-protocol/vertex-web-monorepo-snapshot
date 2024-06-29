import { BRAND_SEO_METADATA } from 'common/brandMetadata/seoInfo';
import { Head, Html, Main, NextScript } from 'next/document';

export default function AppDocument() {
  return (
    <Html>
      <Head>
        {/*Favicons*/}
        <link rel="icon" href={BRAND_SEO_METADATA.favicon} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={BRAND_SEO_METADATA.appleTouchIcon}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={BRAND_SEO_METADATA.favicon32x32}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={BRAND_SEO_METADATA.favicon16x16}
        />
        <link
          rel="mask-icon"
          type="image/svg+xml"
          sizes="any"
          href={BRAND_SEO_METADATA.safariPinnedTab}
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="msapplication-TileColor"
          content={BRAND_SEO_METADATA.tileColor}
        />
        {/* Header color on mobile */}
        <meta name="theme-color" content={BRAND_SEO_METADATA.headerColor} />
        {/*Description*/}
        <meta content={BRAND_SEO_METADATA.description} name="description" />
        {/*OG Socials*/}
        <meta content={BRAND_SEO_METADATA.title} property="og:title" />
        <meta content={BRAND_SEO_METADATA.title} property="og:site_name" />
        <meta
          content={BRAND_SEO_METADATA.description}
          property="og:description"
        />
        <meta content={BRAND_SEO_METADATA.bannerImage} property="og:image" />
        {/*Twitter*/}
        <meta name="twitter:site" content="@vertex_protocol" />
        <meta name="twitter:title" content={BRAND_SEO_METADATA.title} />
        <meta
          name="twitter:description"
          content={BRAND_SEO_METADATA.description}
        />
        <meta name="twitter:image" content={BRAND_SEO_METADATA.bannerImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
