import React, { useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Dropzone, { DropzoneProps } from 'react-dropzone';
import Head from 'next/head';
import * as Yup from 'yup';

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

import { Container, Content, InputDiv, TextAreaContainer, DropContainer } from './styles';

interface FormSubmitAttributes {
  title: string;
  subtitle: string;
  description: string;
  avatar_id: string;
}

const share: React.FC = () => {
  const dataMaster = {};

  const formRef = useRef<FormHandles>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [error, setError] = useState('');

  const { token, user } = useAuth();
  const router = useRouter();

  const handleUpdateImage = useCallback(async (file) => {
    const fd = new FormData();

    fd.append('action', 'ADD');
    fd.append('param', 0);
    fd.append('secondParam', 0);
    fd.append('file', file[0]);

    const { data } = await api.patch('/users/avatar', fd);

    Object.assign(dataMaster, data);

    setIsFile(true);
  }, []);

  const handleSubmitForm = useCallback(async (data: FormSubmitAttributes) => {
    try {
      setIsLoading(true);
      setIsError(false);

      Object.assign(data, {
        description: textAreaRef.current.value,
        avatar_id: dataMaster.url,
      });

      console.log(data);

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
        description: data.description,
        avatar_id: data.avatar_id
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

  const handleDragMessage = useCallback((isDragActive, isDragReject) => {
      if(isDragReject) {
        return (<span>Arquivo não suportado :(</span>);
      }

      if(isDragActive) {
        return (<span>Solte ele aqui!</span>);
      }

      if(!!dataMaster.url) {
        return (<span>Arquivo inserido :)</span>);
      }

      return <span>Arraste sua imagem aqui!</span>
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
          <Dropzone accept="image/*" onDropAccepted={(file) => handleUpdateImage(file)}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
              <DropContainer
                {...getRootProps()}
                isDragActive={isDragActive}
                isDragReject={isDragReject}
                isFile={isFile}
              >
                <input {...getInputProps()} name="file" type="file" />
                <div>
                  <img src="/static/icons/veDropzone.png" alt="dropzone_icon" />
                  <img src="/static/icons/veDropzoneAccepts.png" alt="dropzone_accepts_icon" />
                  <img src="/static/icons/veDropzoneRejects.png" alt="dropzone_accepts_icon" />
                  <img src="/static/icons/veDropzoneBlue.png" alt="dropzone_accepts_icon" />
                </div>
                {handleDragMessage(isDragActive, isDragReject)}
              </DropContainer>
            )}
          </Dropzone>
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
