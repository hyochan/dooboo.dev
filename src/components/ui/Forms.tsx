import styled from 'styled-components';

type TInput = {
  widthinrem?: number;
  isTouched?: boolean;
  error?: string;
}

export const FormLabel = styled.label`
  display: flex;
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 0.5rem;
  justify-content: flex-end;
  align-self: flex-end;
  color: ${({ theme }) => theme.fontColor};
`

export const FormError = styled.span`
  display: flex;
  font-size: 0.8rem;
  font-weight: bold;
  align-self: flex-end;
  color: ${({ theme }) => theme.error}
`

export const FormInput = styled.input<TInput>`
  display: flex;
  width: ${({ widthinrem }) => widthinrem}rem;  
  background-color: transparent;
  color: ${({ theme, isTouched, error }) => ((isTouched && error) ? theme.error : theme.fontColor)};
  padding: 0.3rem 0.5rem 0 0.5rem;
  font-size: 1.1rem;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme, isTouched, error }) => ((isTouched && error) ? theme.error : theme.fontColor)};
  &:focus {
    outline: none;
    border-bottom-color: ${({ theme, isTouched, error }) => ((isTouched && error) ? theme.error : theme.highlighted)};

    +label {
      color: ${({ theme, isTouched, error }) => ((isTouched && error) ? theme.error : theme.highlighted)};
    }
  }
`