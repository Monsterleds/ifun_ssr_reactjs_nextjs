import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

interface DropZoneProps {
  isDragActive: boolean;
  isDragReject: boolean;
  isFile: boolean;
}

interface TextAreaProps {
  isError: boolean;
  isSelected: boolean;
  isFilled: boolean;
}

export const Container = styled.div`
  padding-bottom: 57px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 45px;
  width: 100%;
  background: #f3f3f3;
  box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 57px;

  h5 {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 18px;
    color: #545454;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

export const InputDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 78px;

  div {
    width: 100%;

    :last-child {
      margin-left: 90px;
    }
  }
`;

export const TextAreaContainer = styled.div<TextAreaProps>`
  margin: 41px 0px;
  width: 100%;

  textarea {
    resize: none;
    width: 100%;
    height: 342px;
    border: 2px solid #fff;
    padding: 24px;
    font-weight: 600;
    border-radius: 8px;
    font-size: 18px;
    color: ${lighten(0.2, '#000')};
    transition: 0.2s;

    ::placeholder {
      color: #d2d2d2;
    }

    ${(props) =>
      props.isFilled &&
      css`
        border: 2px solid #080077;
      `}

    ${(props) =>
      props.isSelected &&
      css`
        border: 2px solid ${lighten(0.3, '#080077')};
      `}

    ${(props) =>
      props.isError &&
      css`
        border: 2px solid #ff4565;
        margin-bottom: 16px;
      `}
  }
`;

export const DropContainer = styled.div<DropZoneProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 2px dashed #c4c4c4;
  transition: 0.2s;
  background-color: #fff;
  border-radius: 8px;
  max-width: 332px;
  width: 100%;
  height: 264px;
  color: #c4c4c4;
  font-weight: bold;
  padding-top: 24px;


  div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 72px;
    transition: 0.2s;

    img {
      opacity: 0;
      position: absolute;
      width: 56px;
      height: 49px;
      transition: 0.2s;

      :first-child {
        opacity: 1;
      }
    }
  }

  ${(props) =>
    props.isDragActive &&
    css`
      border-color: #0f0;

      span {
        color: #0f0;
      }

      div > img {
        :nth-child(1) {
          opacity: 0;
        }

        :nth-child(2) {
          opacity: 1;
        }

        :nth-child(3) {
          opacity: 0;
        }

        :nth-child(4) {
          opacity: 0;
        }
    `}
  }

  ${(props) =>
    props.isDragReject &&
    css`
      border-color: #f00;

      span {
        color: #f00;
      }

      div > img {
        :nth-child(1) {
          opacity: 0;
        }

        :nth-child(2) {
          opacity: 0;
        }

        :nth-child(3) {
          opacity: 1;
        }

        :nth-child(4) {
          opacity: 0;
        }
    `}

    ${(props) =>
      props.isFile &&
      css`
        border-color: ${darken(0.2, '#00f')};

        span {
          color: ${darken(0.2, '#00f')};
        }

        div > img {
          :nth-child(1) {
            opacity: 0;
          }

          :nth-child(2) {
            opacity: 0;
          }

          :nth-child(3) {
            opacity: 0;
          }

          :nth-child(4) {
            opacity: 1;
          }
        }
      `}
  }
`;
