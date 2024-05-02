import { SEO_INFO } from 'client/seoInfo';
import { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';

export default function AppDocument() {
  return (
    <Html>
      <Head>
        {/*Favicons*/}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          type="image/svg+xml"
          sizes="any"
          href="/safari-pinned-tab.svg"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        {/* Header color on mobile */}
        <meta name="theme-color" content="#0e0e14" />
        {/*Description*/}
        <meta content={SEO_INFO.description} name="description" />
        {/*OG Socials*/}
        <meta content={SEO_INFO.title} property="og:title" />
        <meta content={SEO_INFO.title} property="og:site_name" />
        <meta content={SEO_INFO.description} property="og:description" />
        <meta content={SEO_INFO.bannerImage} property="og:image" />
        {/*Twitter*/}
        <meta name="twitter:site" content="@vertex_protocol" />
        <meta name="twitter:title" content={SEO_INFO.title} />
        <meta name="twitter:description" content={SEO_INFO.description} />
        <meta name="twitter:image" content={SEO_INFO.bannerImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body className="custom-scrollbar">
        <Main />
        <NextScript />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KDBJJ6Z"
            height="0" width="0" style="display:none;visibility:hidden" />`,
          }}
        />
      </body>
    </Html>
  );
}
