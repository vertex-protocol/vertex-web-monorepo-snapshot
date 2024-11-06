import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleAnalytics, joinClassNames } from '@vertex-protocol/web-common';
import { GatedAccessWrapper } from 'components/GatedAccessWrapper';
import { SEO_INFO } from 'config/seoInfo';
import { domAnimation, LazyMotion } from 'framer-motion';
import { useBlitzCookiePreference } from 'hooks/useBlitzCookiePreference';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Image from 'next/image';

import backgroundImage from 'public/blitz/blitz-background.png';
import { ibmMono, pixelify } from 'utils/fonts';
import 'styles/globals.css';

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
  const { areCookiesAccepted } = useBlitzCookiePreference();

  return (
    <main
      className={joinClassNames(
        ibmMono.variable,
        pixelify.variable,
        pixelify.className,
        'antialiased',
        'relative h-screen w-screen overflow-hidden',
      )}
    >
      <Head>
        <title>{SEO_INFO.title}</title>
      </Head>
      <GoogleAnalytics areCookiesAccepted={areCookiesAccepted} gtmId="" />
      {/*This must be placed outside of the GatedAccessWrapper, otherwise it won't be rendered when accessed from a restricted location.*/}
      <AppSeoInfo />
      <QueryClientProvider client={queryClient}>
        <LazyMotion features={domAnimation}>
          <GatedAccessWrapper>
            {/* Background image */}
            <Image
              className="object-cover"
              src={backgroundImage}
              sizes="100vw"
              alt="bg-header"
              fill
            />
            <Component {...pageProps} />
          </GatedAccessWrapper>
        </LazyMotion>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </main>
  );
}

export default App;
