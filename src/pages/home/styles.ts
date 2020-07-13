import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface PostAttributes {
  isLiked?: boolean;
}

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  li {
    margin-top: 56px;

    ul {
      display: flex;
      align-items: center;
      background-color: #F3F3F3;
      border-radius: 8px;
      height: 386px;
      box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.15);

      & + ul {
        margin-top: 43px;
      }
    }
  }
`;

export const ImageContainer = styled.div`
  height: 100%;

  img {
    height: 100%;
    width: auto;
  }
`;

export const ContentPost = styled.div<PostAttributes>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 72px;
  width: 100vw;

  div {
    display: flex;
    justify-content: space-between;
    align-content: flex-end;
    align-items: center;
    color: #545454;
    margin-top: 6px;

    span {
      margin-right: 17px;
    }

    div {
      display: flex;
      align-items: center;
      position: relative;

      img {
        position: absolute;
        right: 0;
        bottom: -4px;
        cursor: pointer;

        ${props => props.isLiked && css`
          :last-of-type {
            opacity: 1;
          }
        `}
      }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 160px;
      height: 32px;
      border: 0;
      background-color: #FF4565;
      border-radius: 8px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      transition: 0.2s;

      :hover {
        background-color: ${shade(0.2, '#FF4565')};
      }
    }
  }

  h1 {
    color: #151515;
    font-size: 36px;
  }

  h2 {
    color: #434344;
    font-weight: 500;
  }

  p {
    color: #6A6A6A;
    font-size: 16px;
    margin: 29px 0px;
  }
`;