import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      color: #FF4565;
      font-size: 72px;
      font-weight: bold;
    }

    p {
      font-weight: bold;
      font-size: 30px;
      margin-top: 24px;
      color: rgba(8, 0, 119, 0.68);
    }
  }
`;