import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
  max-width: 725px;
  width: 100%;
  height: 680px;
  padding: 0 100px;
  box-shadow: 0px 4px 100px rgba(23, 23, 23, 0.1);
  border-radius: 8px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 64px;
  width: 100%;

  span {
    color: #545454;
    font-weight: bold;
    margin-bottom: 7px;
  }

  & + div {
    margin-bottom: 29px;
  }
`;

export const SignUpLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  align-self: flex-end;
  margin-top: 16px;
  transition: 0.2s;

  a {
    margin-left: 10.5px;
    color: #434344;
    font-weight: 600;
  }

  :hover {
    opacity: 70%;
  }
`;

export const Logo = styled.img`
  margin-bottom: 41px;
`;
