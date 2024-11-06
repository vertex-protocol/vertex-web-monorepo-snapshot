import { Head, Html, Main, NextScript } from 'next/document';
import { SEO_INFO } from 'config/seoInfo';
import { LINKS } from 'config/links';

export default function AppDocument() {
  const schemaData = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: SEO_INFO.title,
    '@id': 'https://blitz.exchange/',
    url: 'https://blitz.exchange/',
    image: SEO_INFO.bannerImage,
    sameAs: [LINKS.x, LINKS.discord, LINKS.blog],
  };
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
        <link rel="canonical" href="https://blitz.exchange/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
