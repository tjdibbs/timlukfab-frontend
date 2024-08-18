/* eslint-disable @next/next/google-font-display */
// noinspection HtmlRequiredTitleElement

import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@mui/styles";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link href={`/identity/favicon.png`} rel="shortcut icon" />
          <link rel="icon" type="image/x-icon" href={`/identity/favicon.png`} />
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
          <meta content="#ed017f" name="theme-color" />
          <meta content="#ed017f" name="msapplication-TileColor" />
          <meta content="#ed017f" name="msapplication-TileColor" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="pauloxuries" name="application-name" />
          <link href="/identity/logo.png" rel="icon" sizes="192x80" />
          <meta content="yes" name="apple-mobile-web-app-capable" />

          <meta
            content="#ed017f"
            name="apple-mobile-web-app-status-bar-style"
          />
          <meta content="Pauloxuries" name="apple-mobile-web-app-title" />
          <link href="/identity/favicon.png" rel="apple-touch-icon" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta content="@pauloxuries" name="twitter:site" />
          <meta content="website" property="og:type" />
          <meta content="en-US" property="og:locale" />
          <meta content="image/png" property="og:image:type" />
          <meta content="400" property="og:image:height" />
          <meta content="600" property="og:image:width" />
          <meta content="INDEX,FOLLOW" name="robots" />
          <meta
            content="unisex fashion store, men and women fashion, great online shopping sites to buy from, online shopping, buyer protection guaranteed, online shopping in nigeria, online shopping sites with the best prices, online shopping sites, online shopping sites in nigeria, online shopping websites, online fashion shopping , fashion shopping, Pauloxuries Fashion Store, online shopping stores in lagos, Nigeria's number one online shopping, first choice fashion store, Everything fashion online shopping, order online, purchase genuine products, top brands, fast shipping, 100% satisfaction, find perfect match, fashion wears, decide what to wear, vintage wears, rugged wears, sneakers, designer"
            name="keywords"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceComponent: (Component) => Component,
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
