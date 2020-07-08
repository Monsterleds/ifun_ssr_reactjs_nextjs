import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children }) => {
  return <Container>{children}</Container>;
}

export default Button;