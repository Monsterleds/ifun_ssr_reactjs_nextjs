import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';

import Loading from '../Loading';

import api from '../../services/api';

import { Container, ImageContainer, ContentPost } from './styles';

interface PostAttributes {
  post: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    likes: number;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
  likedPost: string[];
}

interface ResponseLikes {
  alreadyLiked: boolean;
  likes: number;
}

const Posts: React.FC<PostAttributes> = ({ post, user, token, likedPost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [numberLikes, setNumberLikes] = useState(post.likes);

  useEffect(() => {
    const findedPost = likedPost.find((id) => id === post.id);

    if (findedPost) {
      setIsLiked(true);
    }
  }, [likedPost, post.id]);

  const handleLikedToggle = useCallback(async () => {
    try {
      setIsLiked(!isLiked);

      const { data } = await api.put<ResponseLikes>(
        '/posts/likes',
        {
          id_post: post.id,
          id_user: user.id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );

      setIsLiked(data.alreadyLiked);
      setNumberLikes(data.likes);
    } catch (err) {
      console.error(err);
    }
  }, [post.id, user.id, token, isLiked]);

  return (
    <Container key={post.id}>
      {isLoading && <Loading />}
      <ImageContainer>
        <img src="/static/img_default.png" alt="post_image" />
      </ImageContainer>
      <ContentPost isLiked={isLiked}>
        <h1>{post.title}</h1>
        <h2>{post.subtitle}</h2>
        <p>{post.description}</p>
        <div>
          <Link href={`/post/${post.id}`}>
            <button type="button" onClick={() => setIsLoading(true)}>
              Ver
            </button>
          </Link>
          <div>
            <span>{numberLikes}</span>
            <div onClick={handleLikedToggle}>
              <img src="/static/icons/veHearth.png" alt="hearth_icon" />
              <img
                src="/static/icons/veHearthFilled.png"
                alt="hearthfilled_icon"
              />
            </div>
          </div>
        </div>
      </ContentPost>
    </Container>
  );
};

export default Posts;