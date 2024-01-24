import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest/manifest.webmanifest"></link>
        <link rel="apple-touch-icon" href="/manifest/icon-192x192.png"></link>
        <meta name="theme-color" content="#0c0521" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}