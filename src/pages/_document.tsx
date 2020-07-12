import React, { ReactElement } from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import GlobalStyles from '../styles/global';

interface ReturnInitialProps {
  styleTags?: ReactElement;
}

export default class MyDocument extends Document<ReturnInitialProps> {
  static getInitialProps({ renderPage }: any) {
    const sheet = new ServerStyleSheet();

    const page = renderPage((App:React.FC) => (props: any) =>
      sheet.collectStyles(<><App {...props} /><GlobalStyles /></>),
    );

    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {this.props.styleTags}
      </Head>
      <body>
          <Main />
          <NextScript />
      </body>
      </html>
    )
  }
}