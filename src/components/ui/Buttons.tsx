import styled from 'styled-components';

interface IButton {
  disabled?: boolean
}

export const ButtonPrimary = styled.button<IButton>`
  display: flex;
  width: 100%;
  height: 100%;

  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  border-color: #e3e3e3;
  margin-bottom: 8px;

  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${({ theme }) => theme.btnPrimary};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  // transition: opacity 0.2s;

  &:hover {
    opacity: 0.5;
  }
  &:active {
    opacity: 0.5;
  }
`;

export const ButtonPrimaryLight = styled.button<IButton>`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 8px;

  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${(props) => props.theme.btnPrimaryLight};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  // transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.5;
  }
  &:active {
    opacity: 0.5;
  }
`;
