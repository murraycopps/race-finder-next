import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest/manifest.webmanifest" />
          <link rel="apple-touch-icon" href="/manifest/icon-192x192.png" />
          <link rel="icon" href="/manifest/icon-192x192.png" />
          <link rel="icon" href="/manifest/clock-icon.ico" />
          <meta name="theme-color" content="#0c0521" />
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
