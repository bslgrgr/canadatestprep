import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import '../public/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/canadatestprep/sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
            console.error('ServiceWorker registration failed: ', error);
          });
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;