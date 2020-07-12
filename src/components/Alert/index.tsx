import React from 'react';

import { Container, Content } from './styles';

interface AlertAttributes {
  errorText: string;
}

const Alert: React.FC<AlertAttributes> = ({ errorText }) => {
  return (
    <Container>
      <Content>
        <div>
          <span>{errorText}</span>
          <button>Vou arrumar!</button>
        </div>
      </Content>
    </Container>
  )
}

export default Alert;