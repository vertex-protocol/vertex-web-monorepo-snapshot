import { joinClassNames } from '@vertex-protocol/web-common';
import { dmSans, inter } from 'client/utils/fonts';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={joinClassNames(
        dmSans.className,
        inter.variable,
        dmSans.variable,
      )}
    >
      <Component {...pageProps} />
    </main>
  );
}

export default App;
