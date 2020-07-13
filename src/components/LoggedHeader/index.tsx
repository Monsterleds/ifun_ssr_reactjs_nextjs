import React from 'react';
import Link from 'next/link';

import { NavContent, ImgContainer, Links, Container } from './styles';

interface HeaderProps {
  isSelected?: string;
}

const InitialHeader: React.FC<HeaderProps> = ({ isSelected }) => {
  return (
    <Container>
        <Link href="/home">
          <ImgContainer>
            <img src="/static/logo.png" alt="logo" />
            <span>Bem vindo(a), Fulano</span>
          </ImgContainer>
        </Link>
        <NavContent>
          <Link href="/"><Links isSelected={isSelected === 'YourPosts' && true}>Suas postagens</Links></Link>
          <div>
            <Link href="/signin"><button>Compartilhar</button></Link>
            <Link href="/signup">
              <button>
                <img src="/static/icons/fiPower.png" alt="power_icon"/>
                <img src="/static/icons/fiPower_hover.png" alt="power_hover"/>
              </button>
            </Link>
          </div>
        </NavContent>
      </Container>
  )
}

export default InitialHeader;