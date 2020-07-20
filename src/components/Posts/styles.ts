import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface PostAttributes {
  isLiked?: boolean;
}

interface ButtonContainerAttributes {
  editable?: boolean;
}

export const Container = styled.ul`
  display: flex;
  align-items: center;
  background-color: #f3f3f3;
  border-radius: 8px;
  height: 386px;
  box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.15);
  transition: 0.2s;

  & + ul {
    margin-top: 43px;
  }

  :hover {
    height: 400px;
  }
`;

export const ImageContainer = styled.div`
  height: 100%;

  img {
    height: 100%;
    width: 471px;
    border-radius: 8px 0px 0px 8px;
  }
`;

export const ContentPost = styled.div<PostAttributes>`
  position: relative;
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
        transition: 0.2s;

        :last-of-type {
          opacity: 0;
        }

        ${(props) =>
          props.isLiked &&
          css`
            :last-of-type {
              opacity: 1;
            }
          `}
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
    color: #6a6a6a;
    font-size: 16px;
    margin: 29px 0px;
  }
`;

export const ButtonsContainer = styled.div<ButtonContainerAttributes>`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 32px;
    border: 0;
    background-color: #ff4565;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    transition: 0.2s;

    :hover {
      background-color: ${shade(0.2, '#FF4565')};
    }

    ${(props) =>
      props.editable &&
      css`
        :last-child {
          margin-left: 29px;
        }
      `}
  }
`;

export const ThreshIcon = styled.img`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 70px;
  width: 20px;
  height: 23px;
  transition: 0.2s;

  :hover {
    height: 26px;
    width: 23px;
  }
`;

export const DeleteContent = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: calc(50% - 256px);
  top: calc(50% - 95px);
  width: 512px;
  height: 190px;
  background-color: #fff;
  border-radius: 8px;
  z-index: 32;

  h5 {
    font-size: 18px;
    color: #000;
  }

  div {
    margin-top: 24px;
    display: flex;
    flex-direction: space-between;
    align-items: center;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ff4565;
      width: 160px;
      height: 32px;
      border: 0;
      border-radius: 8px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      transition: 0.2s;

      :hover {
        background-color: ${shade(0.2, '#ff4565')};
      }

      :last-child {
        margin-left: 29px;
      }

      img {
        margin-left: 3px;
      }
    }
  }
`;

export const BackgroundContainer = styled.div`
  position: absolute;
  background-color: rgba(196, 196, 196, 0.6);
  left: 0;
  top: 0;
  width: 100vmax;
  height: 100vmax;
  z-index: 21;
`;
