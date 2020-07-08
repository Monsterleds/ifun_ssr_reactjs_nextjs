import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
      border-radius: 8px;
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
      background-color: #FF4565;
      width: 254px;
      height: 60px;
      border: 0;
      transition: 0.2s;

      :hover {
        background-color: ${shade(0.2, '#FF4565')};
      }
`;