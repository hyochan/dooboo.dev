import { Form } from 'formik';
import styled from 'styled-components';

type TInputProps = {
  'data-testid'?: string;
  widthinrem?: number;
  right?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.background};  
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const FormInnerWrapper = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

export const SignContainer = styled(Form)<TInputProps>`
  display: flex;
  width: ${({ widthinrem }) => widthinrem}rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const BottomTextBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
`;

export const BottomTextButton = styled.input.attrs(() => ({
  type: 'button',
}))<TInputProps>`
  margin-left: ${({ right }) => (right ? '1rem' : 0)};
  border: none;
  text-decoration-line: underline;
  background-color: transparent;
  color: ${({ theme }) => theme.highlighted};
  cursor: pointer;
`;
