import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { useAuth } from '../../hooks/auth';
import { useFetch } from '../../hooks/useFetch';

import Header from '../../components/LoggedHeader';
import Posts from '../../components/Posts';

import { Container, Content } from './styles';

interface IPosts {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  likes: number;
}

interface IResponsePostsLikes {
  post: {
    id: string;
  };
}

const home: React.FC = () => {
  const [allPosts, setAllPosts] = useState([] as IPosts[]);
  const [idsPosts, setIdsPosts] = useState(['']);

  const { token, user } = useAuth();

  useEffect(() => {
    async function requestPosts(): Promise<IPosts[]> {
      const response = await useFetch<IPosts>('/posts/all', token);

      if (!response) {
        throw new Error('Database error, maybe is off');
      }

      const data = await useFetch<IResponsePostsLikes>(
        `/posts/likes/${user.id}`,
        token,
      );

      if (!data) {
        throw new Error('a');
      }

      const allIdsPosts = data.map((post) => {
        return post.post.id;
      });

      setIdsPosts(allIdsPosts);
      setAllPosts(response);
      return response;
    }
    requestPosts();
  }, [token, user.id]);

  return (
    <Container>
      <Header />
      <Head>
        <title>Home</title>
      </Head>
      <Content>
        <li>
          {allPosts &&
            allPosts.map((post) => (
              <Posts
                post={post}
                user={user}
                token={token}
                likedPost={idsPosts}
                key={post.id}
              />
            ))}
        </li>
      </Content>
    </Container>
  );
};

export default home;
