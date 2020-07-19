import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../../../services/api';

import getValidationErrors from '../../../../utils/getValidationErrors';

import { useAuth } from '../../../../hooks/auth';

import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Loading from '../../../../components/Loading';
import Header from '../../../../components/LoggedHeader';
import Toast from '../../../../components/Toast';

import { Container, Content, InputDiv, TextAreaContainer } from './styles';

interface FormSubmitAttributes {
  title: string;
  subtitle: string;
  description: string;
}

const share: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const { token, user } = useAuth();
  const router = useRouter();

  const handleSubmitForm = useCallback(async (data: FormSubmitAttributes) => {
    try {
      setIsLoading(true);
      setIsError(false);

      Object.assign(data, {
        description: textAreaRef.current.value,
      });

      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string().required('Title é obrigatório').max(25),
        subtitle: Yup.string().required('Subtitle é obrigatório').max(40),
        description: Yup.string()
          .required('Description é obrigatório')
          .max(330),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/posts', {
        id_user: user.id,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description
      }, {
        headers: { authorization: `Bearer ${token}` },
      })

      router.push('/home');
    } catch (err) {
      setIsLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        if(errors.description) {
          setIsError(true);
        }

        formRef.current.setErrors(errors);

        return;
      }

      setError('Erro ao realizar uma query no banco, possívelmente offline.');
    }
  }, []);

  const handleOnClick = useCallback(() => {
    setIsSelected(true);
  }, []);

  const handleOnBlured = useCallback(() => {
    setIsSelected(false);

    setIsFilled(!!textAreaRef.current?.value);
  }, []);

  return (
    <Container>
      <Header isSelected="Shared" />
      {isLoading && <Loading />}
      {error && <Toast messages={[{ id: '1', message: error }]} />}
      <Head>
        <title>Sharing Post | iFun</title>
      </Head>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmitForm}>
          <InputDiv>
            <div>
              <h5>Título</h5>
              <Input placeholder="Arroz bife com batata" name="title" />
            </div>
            <div>
              <h5>Sub-Título</h5>
              <Input placeholder="Marmitex das boas" name="subtitle" />
            </div>
          </InputDiv>

          <TextAreaContainer isError={!!isError} isSelected={isSelected} isFilled={isFilled}>
            <h5>Descrição</h5>
            <textarea ref={textAreaRef} placeholder="abc..." onFocus={handleOnClick} onBlur={handleOnBlured} />
          </TextAreaContainer>

          <Button type="submit">Postar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default share;
