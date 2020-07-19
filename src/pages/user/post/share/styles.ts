import styled, { css } from 'styled-components';
import { lighten } from 'polished';

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

  div {
    width: 100%;
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

  div:last-child {
    margin-left: 90px;
  }
`;

export const TextAreaContainer = styled.div<TextAreaProps>`
  margin: 41px 0px;

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
