import React, { useCallback } from 'react';
import lscache from 'lscache';
import Link from 'next/link';
import router from 'next/router';

import { useAuth } from '../../hooks/auth';

import { NavContent, ImgContainer, Links, Container } from './styles';

interface HeaderProps {
  isSelected?: string;
  isHome?: boolean;
}

const InitialHeader: React.FC<HeaderProps> = ({ isSelected, isHome }) => {
  const { user } = useAuth();

  const handleClearStorage = useCallback(() => {
    lscache.remove('@ifun/user');
    lscache.remove('@ifun/token');

    router.reload();
  }, []);

  return (
    <Container>
      <Link href="/home">
        <ImgContainer>
          <img src="/static/logo.png" alt="logo" />
          {isHome && <span>Bem vindo(a), {user.name && user.name}</span>}
        </ImgContainer>
      </Link>
      <NavContent>
        <Link href="/">
          <Links isSelected={isSelected === 'YourPosts' && true}>
            Suas postagens
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
