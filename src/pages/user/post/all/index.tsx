import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useAuth } from '../../../../hooks/auth';
import { useFetch } from '../../../../hooks/useFetch';

import Header from '../../../../components/LoggedHeader';
import Loading from '../../../../components/Loading';
import Posts from '../../../../components/Posts';

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

const AllPosts: React.FC = () => {
  const [allPosts, setAllPosts] = useState([] as IPosts[]);
  const [idsPosts, setIdsPosts] = useState(['']);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const { token, user, hookAuthenticatedUser, hookSetErrors } = useAuth();

  try {
    hookAuthenticatedUser(true);
  } catch (err) {
    return <div />;
  }

  useEffect(() => {
    async function requestPosts(): Promise<void> {
      if (!token) {
        return;
      }

      try {
        const response = await useFetch<IPosts[]>(
          `/user/post/${user.id}`,
          token,
        );

        const data = await useFetch<IResponsePostsLikes[]>(
          `/posts/likes/${user.id}`,
          token,
        );

        const allIdsPosts = data.map((post) => {
          return post.post.id;
        });

        setIdsPosts(allIdsPosts);
        setAllPosts(response);
        setIsLoading(false);
      } catch (err) {
        hookSetErrors(err.message);
        router.push('/signin');
      }
    }
    requestPosts();
  }, [token, user.id, router, hookSetErrors]);

  return (
    <Container>
      {isLoading && <Loading />}
      <Header isSelected="YourPosts" />
      <Head>
        <title>Your Posts | iFun</title>
      </Head>
      <Content>
        <li>
          {allPosts[0] ? (
            allPosts.map((post) => (
              <Posts
                post={post}
                user={user}
                token={token}
                likedPost={idsPosts}
                key={post.id}
                editable
              />
            ))
          ) : (
            <h1>Parece que você não compartilhou nenhuma conquista :/</h1>
          )}
        </li>
      </Content>
    </Container>
  );
};

export default AllPosts;
