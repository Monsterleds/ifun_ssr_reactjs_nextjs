import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background-color: #f0f0f5;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20;
`;

export const Content = styled.div`
  border: 4px solid ${darken(0.1, '#fff')};
  border-radius: 100%;
  border-left-color: #ff4565;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  z-index: 30;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
