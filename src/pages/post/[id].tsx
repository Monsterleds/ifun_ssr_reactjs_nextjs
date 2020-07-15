import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useFetch } from '../../hooks/useFetch';
import { useAuth } from '../../hooks/auth';

import Header from '../../components/LoggedHeader';
import Button from '../../components/Button';

import {
  Container,
  Content,
  HeaderContent,
  ContainerComment,
  ContainerTextArea,
} from './styles';

interface CommentAttributes {
  id: string;
  name: string;
  description: string;
}

interface PostAttributes {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  likes: number;
  avatar_id?: string;
  comments: CommentAttributes[];
}

const post: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [postDetails, setPostDetails] = useState({} as PostAttributes);
  const { token } = useAuth();
  const router = useRouter();

  const { id } = router.query;

  const handleClearSubmitTextArea = useCallback((): void => {
    textAreaRef.current.value = '';
  }, []);

  useEffect(() => {
    async function listAllDetailsPost(): Promise<void> {
      if (!id) {
        return;
      }

      const response = await useFetch<PostAttributes>(
        `/posts/details/${id}`,
        token,
      );

      if (!response) {
        throw new Error('Database error, maybe is off');
      }

      setPostDetails(response);
    }

    listAllDetailsPost();
  }, [id, token]);

  return (
    <Container>
      <Head>
        <title>{postDetails.title} | Ifun</title>
      </Head>
      <Header />
      <Content>
        <HeaderContent>
          <img src="/static/img_default.png" alt="image_default" />
          <div>
            <h1>{postDetails.title}</h1>
            <h2>{postDetails.subtitle}</h2>
            <span>{postDetails.likes} Curtidas</span>
            <Button type="button">
              Gostei!
              <img src="/static/icons/veHearthWhite.png" alt="hearth_icon" />
            </Button>
          </div>
        </HeaderContent>
        <p>{postDetails.description}</p>
        <hr />
        <h3>Comente</h3>
        <ContainerTextArea>
          <textarea ref={textAreaRef} placeholder="Wowwww, que massa!" />
          <Button type="button" onClick={handleClearSubmitTextArea}>
            Comentar
          </Button>
        </ContainerTextArea>
        <h3>Comentários</h3>
        {postDetails.comments &&
          postDetails.comments.map((comment) => (
            <ContainerComment key={comment.id}>
              <h4>{comment.name}</h4>
              <span>{comment.description}</span>
            </ContainerComment>
          ))}
      </Content>
    </Container>
  );
};

export default post;
