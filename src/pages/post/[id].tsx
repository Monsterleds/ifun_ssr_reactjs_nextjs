import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import api from '../../services/api';

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
  ImageHearthCotainer,
} from './styles';

interface CommentAttributes {
  id: string;
  name: string;
  description: string;
  id_post: string;
}

interface ResponsePostIsLiked {
  id: string;
  id_post: string;
  id_user: string;
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
  const [isClickable, setIsClickable] = useState(false);
  const { token, user } = useAuth();
  const router = useRouter();

  const { id } = router.query;

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

      const { data } = await api.get<ResponsePostIsLiked[]>(
        `/posts/likes/${user.id}`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );

      data.map((newPost) => {
        if (newPost.id_post === id) {
          setIsClickable(true);
        }

        return newPost;
      });

      setPostDetails(response);
    }

    listAllDetailsPost();
  }, [id, token, user]);

  const handleClearAndSubmitTextArea = useCallback(async (): Promise<void> => {
    if (!textAreaRef.current) {
      return;
    }

    const comment = {
      name: user.name,
      description: textAreaRef.current.value,
      id_post: id,
    };

    const { data: newComments } = await api.post<CommentAttributes>(
      '/comments',
      comment,
      {
        headers: { authorization: `Bearer ${token}` },
      },
    );

    const newPost = {
      id: postDetails.id,
      title: postDetails.title,
      subtitle: postDetails.subtitle,
      description: postDetails.description,
      likes: postDetails.likes,
      avatar_id: postDetails.avatar_id,
      comments: [...postDetails.comments, newComments],
    };

    setPostDetails(newPost);

    textAreaRef.current.value = '';
  }, [token, id, user.name, postDetails]);

  const handleLikePost = useCallback(async () => {
    const { data } = await api.put(
      '/posts/likes',
      {
        id_user: user.id,
        id_post: id,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      },
    );

    let newLikes = postDetails.likes + 1;

    if (!data.alreadyLiked) {
      newLikes -= 2;
    }

    const newPost = {
      id: postDetails.id,
      title: postDetails.title,
      subtitle: postDetails.subtitle,
      description: postDetails.description,
      likes: newLikes,
      avatar_id: postDetails.avatar_id,
      comments: postDetails.comments,
    };

    setIsClickable(!isClickable);
    setPostDetails(newPost);
  }, [isClickable, token, id, user.id, postDetails]);

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
            <Button
              type="button"
              onClick={handleLikePost}
              isClickable={isClickable}
            >
              Gostei!
              <ImageHearthCotainer isClickable={isClickable}>
                <img src="/static/icons/veHearthWhite.png" alt="hearth_icon" />
                <img src="/static/icons/veHearthFilled.png" alt="hearth_icon" />
              </ImageHearthCotainer>
            </Button>
          </div>
        </HeaderContent>
        <p>{postDetails.description}</p>
        <hr />
        <h3>Comente</h3>
        <ContainerTextArea>
          <textarea ref={textAreaRef} placeholder="Wowwww, que massa!" />
          <Button type="button" onClick={handleClearAndSubmitTextArea}>
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
