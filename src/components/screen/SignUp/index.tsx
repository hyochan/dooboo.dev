import React, { useContext, useCallback } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { AppContext } from '../../../contexts';
import {
  Wrapper,
  SignContainer,
  FormInnerWrapper,
  BottomTextBtnContainer,
  BottomTextButton,
} from './styles';
import { SimpleFormInput } from '../../shared/Input';
import Button from '../../shared/Button';

const ReactSwal = withReactContent(Swal);

export const signUpList = [{
  label: 'email',
  type: 'text',
}, {
  label: 'password1',
  type: 'password',
}, {
  label: 'password2',
  type: 'password',
}];

const signUpValidationSchema = Yup.object({
  email: Yup.string().email(),
  password1: Yup.string().min(6, 'password must be at least 6 characters.').required('password is required'),
  password2: Yup.string().min(6, 'password must be at least 6 characters.').oneOf([Yup.ref('password1'), null], 'passwords must match'),
});

const onSignUpSubmit = ({ email, password1 }, { setSubmitting, resetForm }, history, createUserWithEmailAndPW) => {
  if (createUserWithEmailAndPW) {
    createUserWithEmailAndPW(email, password1)
      .then(({ user: { email } }) => {
        setSubmitting(false);
        ReactSwal.fire({
          title: 'Signing up completed.',
          html: `${email} has been registered in our system.<br />Please sign in now.`,
          type: 'success',
          heightAuto: false,
          customClass: { icon: 'swal-custom-overflow' },
        }).then(() => {
          history.push({
            pathname: '/signin',
            state: { email },
          });
        });
      })
      .catch(({ code, message }) => {
        ReactSwal.fire({
          title: code,
          text: message,
          type: 'error',
          heightAuto: false,
        });
        resetForm();
      });
  }
};

export default ({ history }) => {
  const { state: { firebase: { createUserWithEmailAndPW } } } = useContext(AppContext);
  const onClickSignIn = useCallback(() => history.push('/signin'), []);

  return (
    <Wrapper>
      <Formik
        initialValues={{
          email: '',
          password1: '',
          password2: '',
        }}
        validationSchema={signUpValidationSchema}
        onSubmit={(values, actions) => onSignUpSubmit(values, actions, history, createUserWithEmailAndPW)}
      >
        {({
          isSubmitting,
          isValid,
        }) => (
          <SignContainer widthinrem={20}>
            <FormInnerWrapper>
              {signUpList.map(({ label, type }) => (
                <Field
                  key={label}
                  name={label}
                  type={type}
                  width={7}
                  component={SimpleFormInput}
                />
              ))}
            </FormInnerWrapper>
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
              text="Sign Up"
              height="3.5rem"
            />
            <BottomTextBtnContainer>
              <BottomTextButton
                onClick={onClickSignIn}
                value="Sign In"
              />
            </BottomTextBtnContainer>
          </SignContainer>
        )}
      </Formik>
    </Wrapper>
  );
};
