import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Header from '../../components/InitialHeader';

import { Container, Content } from './styles';

interface HomeInitialProps extends NextPageContext {
  user: string;
}

const Home: NextPage<HomeInitialProps> = () => {
  return (
    <Container>
      <Header isSelected="Home" />
      <Head>
        <title>iFun</title>
      </Head>
      <Content>
        <div>
          <h1>Compartilhe</h1>
          <h1>Suas conquistas!</h1>

          <Link href="/signin">
            <button type="button">Entrar!</button>
          </Link>
        </div>
        <img src="/static/background_home.png" alt="logo" />
      </Content>
    </Container>
  );
};

export default Home;
