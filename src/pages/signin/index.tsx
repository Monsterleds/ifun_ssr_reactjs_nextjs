import React, { useRef, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Header from '../../components/InitialHeader';
import Button from '../../components/Button';

import { Container, Content, InputContainer, SignUpLinkContainer, Logo } from './styles';

interface UserData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleOnSubmit = useCallback(async (data: UserData) => {
   try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('Email é obrigatório').email('Email invalido'),
        password: Yup.string().required('Senha é obrigatório'),
      });

      await schema.validate(data, ({
        abortEarly: false,
      }));

      alert('a');
   } catch(err) {
     if(err instanceof Yup.ValidationError) {
      const errors = getValidationErrors(err);
      
      formRef.current?.setErrors(errors);

      return;
     }

     alert('b');
   }
  }, []);

  return (
    <Container>
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
                <Link href="/signup"><a>Não tenho uma conta</a></Link>
            </SignUpLinkContainer>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default SignIn;