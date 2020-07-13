import styled, { css } from 'styled-components';

interface OptionsProps {
  isSelected: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const NavContent = styled.div`  
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 400px; 
  width: 100%;
  height: 80px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #FF4565;
    color: #FF4565;
    height: 40px;
    width: 40px;
    border-radius: 8px;
    transition: 0.2s;
    font-weight: bold;
    font-size: 16px;

    img {
      position: absolute;
      width: 11px;
      height: 11px;
      transition: 0.2s;

      :last-of-type {
        opacity: 0;
      }
    }    

    :first-of-type {
      width: 160px;
      margin-right: 7px;
    }

    :hover {
      background-color: #FF4565;
      color: #fff;

      img:first-of-type {
        opacity: 0;
      }

      img:last-of-type {
        opacity: 1;
      }
    }
  }
`;

export const Links = styled.a<OptionsProps>`
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        transition: 0.2s;

        :hover {
          color: #FF4565;
        }

        ${props => props.isSelected && css`
          color: #FF4565;
        `}
`;

export const ImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;

  img {
    cursor: pointer;
    transition: 0.2s;

    :hover {
      opacity: 60%;
    }
  }

  span {
    margin-left: 27px;
    margin-top: 8px;
    font-weight: 600;
    width: 100%;
  }
`;