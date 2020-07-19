import React, { useCallback, useState } from 'react';
import lscache from 'lscache';
import Link from 'next/link';
import router from 'next/router';

import { useAuth } from '../../hooks/auth';

import Loading from '../Loading';

import { NavContent, ImgContainer, Links, Container } from './styles';

interface HeaderProps {
  isSelected?: string;
}

const InitialHeader: React.FC<HeaderProps> = ({ isSelected }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSetLoadingPage = useCallback(
    (page: string): void => {
      if (page !== isSelected) {
        setIsLoading(true);
      }
    },
    [isSelected],
  );

  const handleClearStorage = useCallback(() => {
    lscache.remove('@ifun/user');
    lscache.remove('@ifun/token');

    router.reload();
  }, []);

  return (
    <Container>
      {isLoading && <Loading />}
      <ImgContainer>
        <Link href="/home">
          <img
            src="/static/logo.png"
            alt="logo"
            onClick={() => handleSetLoadingPage('Home')}
          />
        </Link>
        {isSelected === 'Home' && (
          <span>Bem vindo(a), {user.name && user.name}</span>
        )}
      </ImgContainer>
      <NavContent>
        <Link href="/user/post/all">
          <Links isSelected={isSelected === 'YourPosts' && true}>
            <span onClick={() => handleSetLoadingPage('YourPosts')}>
              Suas postagens
            </span>
          </Links>
        </Link>
        <div>
          <Link href="/signin">
            <button type="button">Compartilhar</button>
          </Link>
          <button type="button" onClick={handleClearStorage}>
            <img src="/static/icons/fiPower.png" alt="power_icon" />
            <img src="/static/icons/fiPower_hover.png" alt="power_hover" />
          </button>
        </div>
      </NavContent>
    </Container>
  );
};

export default InitialHeader;
