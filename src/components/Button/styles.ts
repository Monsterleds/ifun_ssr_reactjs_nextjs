import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerButtonAttributes {
  isClickable?: boolean;
}

export const Container = styled.button<ContainerButtonAttributes>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  background-color: #ff4565;
  width: 254px;
  height: 60px;
  border: 2px solid #ff4565;
  transition: 0.2s;

  :hover {
    background-color: ${shade(0.2, '#FF4565')};
  }

  ${(props) =>
    props.isClickable &&
    css`
      color: #ff4565;
      background-color: #fff;

      :hover {
        background-color: ${shade(0.1, '#fff')};
      }
    `}
`;
