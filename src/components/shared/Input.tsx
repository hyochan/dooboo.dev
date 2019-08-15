import React, { useEffect, memo, NamedExoticComponent } from 'react';
import { ErrorMessage } from 'formik';
import styled from 'styled-components';
import { FormLabel, FormError, FormInput } from '../ui/Forms';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 4rem;
  align-self: flex-end;
`;

export const FormInnerContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 1rem auto 0.4rem auto;
`

export const getLabelCapitalize = (label: string) => `${label.charAt(0).toUpperCase()}${label.slice(1)}`;

export const SimpleFormInput: NamedExoticComponent<any> = memo(({ field, form, type, width, receivedEmail, setEmail }) => {
  const { name, ...restFields } = field;
  const  { touched: touches, errors, setFieldValue } = form;
  const isTouched = touches && touches[name];
  const error = errors && errors[name]
  const rest = { type, width, isTouched, error, ...restFields }
  useEffect(() => {
    if (name === 'email' && setEmail && receivedEmail) {
      setFieldValue(name, receivedEmail);
    }
    return () => {
      if (setEmail) {
        setEmail('');
      }      
    }
  }, [setEmail, receivedEmail]);
  
  return (
    <FormContainer>
      <FormInnerContainer>        
        <FormInput id={name} {...rest} />
        <FormLabel data-testid={`label-${name}`} htmlFor={name}>{(name && name.length) && getLabelCapitalize(name)}</FormLabel>
      </FormInnerContainer>
      <ErrorMessage name={name}>
        {err => <FormError data-testid={`errors-${name}`}>{err}</FormError>}
      </ErrorMessage>
    </FormContainer>
  )
})