import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleAnalytics, joinClassNames } from '@vertex-protocol/web-common';
import { GatedAccessWrapper } from 'components/GatedAccessWrapper/GatedAccessWrapper';
import { SEO_INFO } from 'config/seoInfo';
import { useEdgeCookiePreference } from 'hooks/useEdgeCookiePreference';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { sansFont } from '../utils/fonts';

const queryClient = new QueryClient();

function AppSeoInfo() {
  return (
    <div className="absolute opacity-0">
      <h1>{SEO_INFO.title}</h1>
      <h2>{SEO_INFO.description}</h2>
    </div>
  );
}

function App({ Component, pageProps }: AppProps) {
  const { areCookiesAccepted } = useEdgeCookiePreference();

  return (
    <main
      className={joinClassNames(
        'h-dvh min-h-dvh',
        'antialiased',
        sansFont.className,
      )}
    >
      <Head>
        <title>{SEO_INFO.title}</title>
      </Head>
      <GoogleAnalytics areCookiesAccepted={areCookiesAccepted} gtmId="" />
      {/*This must be placed outside of the GatedAccessWrapper, otherwise it won't be rendered when accessed from a restricted location.*/}
      <AppSeoInfo />
      <QueryClientProvider client={queryClient}>
        <GatedAccessWrapper>
          <Component {...pageProps} />
        </GatedAccessWrapper>
      </QueryClientProvider>
    </main>
  );
}

export default App;
