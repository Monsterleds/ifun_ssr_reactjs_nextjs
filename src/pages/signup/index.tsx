import React, { useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Header from '../../components/InitialHeader';
import Loading from '../../components/Loading';
import Button from '../../components/Button';

import { Container, Content, InputContainer, SignInLinkContainer, Logo } from './styles';

interface UserData {
  name: string;
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { hookSignUp, token } = useAuth();

  const redirect = useRouter();

  if(token) {
    redirect.push('/home');
  }

  const handleOnSubmit = useCallback(async (data: UserData) => {
    try {
      setIsLoading(true);

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('Email é obrigatório').email('Email invalido'),
        password: Yup.string().min(6, 'Mínimo 6 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await hookSignUp({ name: data.name, email: data.email, password: data.password });

      redirect.push('/home');
    } catch(err) {
      setIsLoading(false);

      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }

      console.error(err);
    }
  }, []);

  return (
    <Container>
      {isLoading && <Loading />}
      <Header isSelected="SignUp" />
      <Head>
        <title>SignUp | iFun</title>
      </Head>
      <Content>
        <Form ref={formRef} onSubmit={(data) => handleOnSubmit(data)}>
          <Logo src="/static/logo.png" alt="logo"/>
          <InputContainer>
            <span>Nome</span>
            <Input name="name" type="text" placeholder="John Doe" />
          </InputContainer>

          <InputContainer>
            <span>Email</span>
            <Input name="email" type="text" placeholder="example@ifun.com" />
          </InputContainer>

          <InputContainer>
            <span>Senha</span>
            <Input name="password" type="password" placeholder="**********" />
              <SignInLinkContainer>
                <Link href="/signin"><a onClick={() => setIsLoading(true)}>Já tenho uma conta</a></Link>
                <img src="/static/icons/fiLogout.png" alt="login icon" />
              </SignInLinkContainer>
          </InputContainer>
          <Button type="submit">Criar Conta</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default SignIn;
