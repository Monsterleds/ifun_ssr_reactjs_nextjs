import React from 'react';
import Link from 'next/link';

import { NavContent, ImgContainer, Links, Container } from './styles';

interface HeaderProps {
  isSelected: string;
}

const InitialHeader: React.FC<HeaderProps> = ({ isSelected }) => {
  return (
    <Container>
        <NavContent>
          <Link href="/"><Links isSelected={isSelected === 'Home' && true}>Home</Links></Link>
          <Link href="/signin"><Links isSelected={isSelected === 'SignIn' && true}>Entrar</Links></Link>
          <Link href="/signup"><Links isSelected={isSelected === 'SignUp' && true}>Cadastrar</Links></Link>
        </NavContent>
        <ImgContainer>
          {isSelected === 'Home' && <img src="/static/logo.png" alt="logo" />}
        </ImgContainer>
      </Container>
  )
}

export default InitialHeader;