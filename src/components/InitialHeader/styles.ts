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
  max-width: 320px; 
  width: 100%;
  height: 80px;

  img {
    cursor: pointer;
    width: 85px;
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
  width: 105px;
  height: 60px;
  display: flex;
  align-items: center;

  img {
    transition: 0.2s;

    :hover {
      opacity: 60%;
    }
  }
`;