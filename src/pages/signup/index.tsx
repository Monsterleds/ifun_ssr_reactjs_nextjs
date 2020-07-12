import React, { useRef, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Header from '../../components/InitialHeader';
import Button from '../../components/Button';

import { Container, Content, InputContainer, SignInLinkContainer, Logo } from './styles';

interface UserData {
  name: string;
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { hookSignUp } = useAuth();

  const handleOnSubmit = useCallback(async (data: UserData) => {
    try {
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
    } catch(err) {
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
                <Link href="/signin"><a>Já tenho uma conta</a></Link>
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