import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleAnalytics, joinClassNames } from '@vertex-protocol/web-common';
import { GatedAccessWrapper } from 'client/components/GatedAccessWrapper';
import { useVertexCookiePreference } from 'client/hooks/useVertexCookiePreference';
import { SEO_INFO } from 'client/seoInfo';
import { dmSans, ppObjectSans } from 'client/utils/fonts';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

const queryClient = new QueryClient();

// This seems like a good way for us to tell Google what to show in search results
function AppSeoInfo() {
  return (
    <div className="absolute opacity-0">
      <h1>{SEO_INFO.title}</h1>
      <h2>{SEO_INFO.description}</h2>
    </div>
  );
}

function App({ Component, pageProps }: AppProps) {
  const { areCookiesAccepted } = useVertexCookiePreference();

  const component = (
    <>
      <Head>
        <title>Vertex</title>
      </Head>
      <GoogleAnalytics areCookiesAccepted={areCookiesAccepted} gtmId="" />
      <AppSeoInfo />
      <Component {...pageProps} />
    </>
  );

  return (
    <main
      className={joinClassNames(
        ppObjectSans.variable,
        dmSans.variable,
        'antialiased',
      )}
    >
      <QueryClientProvider client={queryClient}>
        <GatedAccessWrapper>{component}</GatedAccessWrapper>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </main>
  );
}

export default App;
