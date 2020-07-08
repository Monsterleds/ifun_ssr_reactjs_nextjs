import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  img {
    width: 797px;
  }

  div {
    display: flex;
    flex-direction: column;

    h1 {
      font-size: 46px;
      width: 100%;

      & + h1 {
        margin-bottom: 33px;
      }
    }

    button {
      border-radius: 8px;
      font-size: 24px;
      font-weight: 600;
      color: #ffffff;
      background-color: #FF4565;
      width: 254px;
      height: 60px;
      margin-top: 33px;
      border: 0;
      transition: 0.2s;

      :hover {
        background-color: ${shade(0.2, '#FF4565')};
      }
    }
  }
`;