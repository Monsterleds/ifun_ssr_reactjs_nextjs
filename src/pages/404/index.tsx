import React from 'react';
import Head from 'next/head';

import { Container } from './styles';

const Error404: React.FC = () => {
  return (
    <Container>
      <img src="/static/404_background.jpg" alt="404_image" />
      <Head>
        <title>404 Not found</title>
      </Head>
      <div>
        <h1>404</h1>
        <p>Não encontramos a página :(</p>
      </div>
    </Container>
  );
};

export default Error404;
