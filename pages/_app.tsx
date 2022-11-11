import type { AppProps } from 'next/app';
import { cache } from '@emotion/css';
import { CacheProvider } from '@emotion/react';
import Head from 'next/head';
import 'assets/style/global.scss';
import 'assets/style/themes.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { setStyleAttribute } from 'utils/theme';
import { store } from 'themes-001/components/redux/store';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps | any) {
  if (pageProps.statusCode >= 400) {
    return <div>Error</div>;
  }

  useEffect(() => {
    setStyleAttribute();
  }, []);

  return (
    <CacheProvider value={cache}>
      <Head>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
      </Head>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default MyApp;
