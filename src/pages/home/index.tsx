import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { useAuth } from '../../hooks/auth';
import { useFetch } from '../../hooks/useFetch';

import Header from '../../components/LoggedHeader';

import { Container, Content, ContentPost, ImageContainer } from './styles';

interface IPosts {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  likes: number;
}

const home: React.FC = () => {
  const { token } = useAuth();
  const [allPosts, setAllPosts] = useState([] as IPosts[]);

  useMemo(async () => {
    const response = await useFetch<IPosts>('/posts/all', token);

    if(!response) {
      throw new Error('Something went wrong');
    }

    setAllPosts(response);

    return response; 
  }, [])

  return (
    <Container>
      <Header />
        <Head>
          <title>Home</title>
        </Head>
      <Content>
        <li>
          {allPosts && allPosts.map(post => (
              <ul key={post.id}>
              <ImageContainer>
                <img src="/static/img_default.png" alt="post_image" />
              </ImageContainer>
              <ContentPost isLiked={true}>
                <h1>{post.title}</h1>
                <h2>{post.subtitle}</h2>
                <p>{post.description}</p>
                <div>
                  <Link href={`/post/${post.id}`}><button>Ver</button></Link>
                  <div>
                    <span>{post.likes}</span>
                    <div>
                      <img src="/static/icons/veHearth.png" alt="hearth_icon" />
                      <img src="/static/icons/veHearthFilled.png" alt="hearthfilled_icon" />
                    </div>
                  </div>
                </div>
              </ContentPost>
            </ul>
          ))}
        </li>
      </Content>
    </Container>
  );
}

export default home;