import styled from 'styled-components';
import { animated } from 'react-spring';

export const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  left: 0;
  width: 100%;
  height: 120px;
  pointer-events: none;
`;

export const ContainerToast = styled(animated.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-right: 50vw;
  width: 360px;
  height: 100%;
  background-color: #ff4565;
  border-radius: 16px;
  padding: 24px;

  div {
    h1 {
      color: #fff;
      font-size: 24px;
    }

    p {
      margin-top: 8px;
      color: #fefe;
      font-weight: 500;
      font-size: 16px;
    }
  }
`;
