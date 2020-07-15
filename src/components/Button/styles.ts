import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
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
  border: 0;
  transition: 0.2s;

  :hover {
    background-color: ${shade(0.2, '#FF4565')};
  }
`;
