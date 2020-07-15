import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 80px;
`;

export const Content = styled.div`
  margin-top: 56px;
  background-color: #fff;
  width: 100%;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0px 4px 100px rgba(0, 0, 0, 0.1);

  p {
    margin-top: 32px;
    color: #6a6a6a;
  }

  hr {
    margin: 40px 0;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 16px;
  }

  textarea {
    resize: none;
    width: 100%;
    padding: 24px;
    border-radius: 8px;
    height: 168px;
    color: #6a6a6a;
    font-size: 16px;
    border-color: #bcbcbc;

    ::placeholder {
      color: rgb(200, 200, 200);
    }
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 386px;
    width: auto;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 56px;

    h1 {
      color: #151515;
      font-size: 48px;
      margin-bottom: 32px;
    }

    h2 {
      color: #434344;
      font-weight: 500;
      font-size: 36px;
    }

    span {
      font-size: 24px;
      color: #434344;
    }

    button {
      position: relative;
      margin-top: 154px;
      font-size: 24px;
      font-weight: 600;

      img {
        width: 20px;
        height: 18px;
        margin-left: 6px;
      }
    }
  }
`;

export const ContainerTextArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  button {
    margin-top: 8px;
  }
`;

export const ContainerComment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #bcbcbc;
  padding: 15px 20px;
  border-radius: 8px;
  color: #464646;
  font-size: 16px;

  & + div {
    margin-top: 18px;
  }

  span {
    margin-top: 17px;
  }
`;
