import React, { useState, useCallback } from 'react';
import Link from 'next/link';

import Loading from '../Loading';

import { NavContent, ImgContainer, Links, Container } from './styles';

interface HeaderProps {
  isSelected: string;
}

const InitialHeader: React.FC<HeaderProps> = ({ isSelected }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSetLoading = useCallback((): void => {
    setIsLoading(true);
  }, []);

  return (
    <Container>
      {isLoading && <Loading />}
      <NavContent>
        <Link href="/">
          <Links
            isSelected={isSelected === 'Home' && true}
            onClick={handleSetLoading}
          >
            Home
          </Links>
        </Link>
        <Link href="/signin">
          <Links
            isSelected={isSelected === 'SignIn' && true}
            onClick={handleSetLoading}
          >
            Entrar
          </Links>
        </Link>
        <Link href="/signup">
          <Links
            isSelected={isSelected === 'SignUp' && true}
            onClick={handleSetLoading}
          >
            Cadastrar
          </Links>
        </Link>
      </NavContent>
      <ImgContainer>
        {isSelected === 'Home' && <img src="/static/logo.png" alt="logo" />}
      </ImgContainer>
    </Container>
  );
};

export default InitialHeader;
