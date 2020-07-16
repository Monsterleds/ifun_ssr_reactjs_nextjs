import React, { useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Header from '../../components/InitialHeader';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Toast from '../../components/Toast';

import { Container, Content, InputContainer, SignUpLinkContainer, Logo } from './styles';

interface UserData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { hookSignIn, hookAuthenticatedUser, error } = useAuth();
  const redirect = useRouter();

  try {
    hookAuthenticatedUser(false);
  } catch (err) {
    return <div />;
  }

  const handleOnSubmit = useCallback(async (data: UserData) => {
   try {
      setIsLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('Email é obrigatório').email('Email invalido'),
        password: Yup.string().required('Senha é obrigatório'),
      });

      await schema.validate(data, ({
        abortEarly: false,
      }));

      await hookSignIn({ email: data.email, password: data.password });

      redirect.push('/home');
   } catch(err) {
      setIsLoading(false)

     if(err instanceof Yup.ValidationError) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);

      return;
     }

     formRef.current?.setErrors({
       email: 'Email ou senha incorretos',
       password: 'Email ou senha incorretos',
     });
   }
  }, []);

  return (
    <Container>
      {isLoading && <Loading />}
      {!!error && <Toast messages={[{ id: '1', message: error }]} />}
      <Header isSelected="SignIn" />
      <Head>
        <title>SignIn | iFun</title>
      </Head>
      <Content>
        <Form ref={formRef} onSubmit={(data) => handleOnSubmit(data)}>
          <Logo src="/static/logo.png" alt="logo"/>
          <InputContainer>
            <span>Email</span>
            <Input name="email" type="text" placeholder="example@ifun.com" />
          </InputContainer>

          <InputContainer>
            <span>Senha</span>
            <Input name="password" type="password" placeholder="**********" />
              <SignUpLinkContainer>
                <img src="/static/icons/fiLogin.png" alt="login icon" />
                <Link href="/signup"><a onClick={() => setIsLoading(true)}>Não tenho uma conta</a></Link>
            </SignUpLinkContainer>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default SignIn;
