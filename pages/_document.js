import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/canadatestprep/manifest.json" />
          <link rel="icon" href="/canadatestprep/favicon.png" />
          <link rel="stylesheet" href="/canadatestprep/styles.css" />
          <link rel="apple-touch-icon" href="/canadatestprep/icons/icon-192x192.png" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
