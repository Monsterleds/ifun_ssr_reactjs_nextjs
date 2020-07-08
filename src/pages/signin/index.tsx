import React from 'react';
import Head from 'next/head';

import Header from '../../components/InitialHeader';
import Button from '../../components/Button';

import { Container, Content, InputContainer, SignUpLinkContainer, Logo } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Header isSelected="SignIn" />
      <Head>
        <title>SignIn | iFun</title>
      </Head>
      <Content>
        <form>
          <Logo src="/static/logo.png" alt="logo"/>
          <InputContainer>
            <span>Email</span>
            <input type="text" placeholder="example@ifun.com" />
          </InputContainer>

          <InputContainer>
            <span>Password</span>
            <input type="password" placeholder="**********" />
              <SignUpLinkContainer>
                <img src="/static/icons/fiLogin.png" alt="login icon" />
                <a href="/signup">Não tenho uma conta</a>
            </SignUpLinkContainer>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </form>
      </Content>
    </Container>
  )
}

export default SignIn;