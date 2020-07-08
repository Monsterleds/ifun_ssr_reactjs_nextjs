import styled, { css } from 'styled-components';
import { lighten } from 'polished';

interface InputProps {
  isSelected: boolean;
  isFilled: boolean;
  isError: boolean;
}

export const Container = styled.label<InputProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  border-radius: 8px;
  padding: 0 23px;
  border : 2px solid #fff;
  background-color: #fff;
  -webkit-transition: 0.2s;

  cursor: text;

  input {
    width: 100%;
    height: 80%;
    font-weight: 600;
    font-size: 18px;
    border: 0;
    background: none;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    -webkit-text-fill-color: ${lighten(0.2, '#000')};

    ::placeholder {
      -webkit-text-fill-color: #D2D2D2;
      font-size: 18px;
      font-weight: bold;
    }
  }

  ${props => props.isFilled && css`
    border: 2px solid #080077;
  `}

  ${props => props.isSelected && css`
    border: 2px solid ${lighten(0.3,'#080077')};
  `}

  ${props => props.isError && css`
    border: 2px solid #FF4565;
  `}
`;