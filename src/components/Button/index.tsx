import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isClickable?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Button;
