import React from 'react';
import App from 'next/app';

import AppProvider from '../hooks/index';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </div>
    );
  }
}
export default MyApp;
