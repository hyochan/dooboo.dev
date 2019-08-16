import React, { useState, useContext, useCallback, Dispatch } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { History } from 'history';

import { AppContext } from '../../../contexts';
import {
  Wrapper,
  SignContainer,
  FormInnerWrapper,
  BottomTextBtnContainer,
  BottomTextButton,
} from '../SignUp/styles';
import { SimpleFormInput } from '../../shared/Input';
import Button from '../../shared/Button';

export interface IProps {
  history?: History<{ email: string }>
}

const ReactSwal = withReactContent(Swal);

export const signInList = [{
  label: 'email',
  type: 'text',
}, {
  label: 'password',
  type: 'password',
}];

const SwalForForgotPW = (pwReset: (email: string) => Promise<void>, setEmail: Dispatch<string>) => {
  ReactSwal.fire({
    title: 'Input your email address.',
    text: 'We\'ll send an email which has a link for reset your password.',
    input: 'email',
    inputPlaceholder: 'Enter your email address',
    heightAuto: false,
    customClass: { title: 'swal-custom-overflow' },
  }).then(({ value: email }) => {
    if (email) {
      pwReset(email).then((result) => {
        ReactSwal.fire({
          title: 'Email Sent!',
          text: 'a link for reset your password has been sent.',
          type: 'success',
          heightAuto: false,
          customClass: { icon: 'swal-custom-overflow' },
        }).then(() => {
          setEmail(email);
        });
      }).catch((err) => {
        console.log('SwalForForgotPW pwReset err: ', err);
      });
    }
  });
};

export const signInValidationSchema = Yup.object({
  email: Yup.string().email(),
  password: Yup.string().min(6, 'password must be at least 6 characters.').required('password is required'),
});

const onSignInSubmit = ({ email, password }, { setSubmitting, resetForm }, push, dispatch, signInWithEmailAndPW) => {
  if (signInWithEmailAndPW) {
    signInWithEmailAndPW(email, password)
      .then(({ user: { email } }) => {
        dispatch({
          type: 'set-user',
          payload: { email },
        });
        setSubmitting(false);
        push('/');
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

export default ({ history: { push, location } }: IProps) => {
  const { state: { firebase: { signInWithEmailAndPW, pwReset } }, dispatch } = useContext(AppContext);
  const [email, setEmail] = useState(() => {
    if (location && location.state) {
      const { email: locEmail = '' } = location.state;
      return locEmail;
    }
    return '';
  });
  const onClickSignUp = useCallback(() => push('/signup'), []);
  const onClickForgotPW = useCallback(() => SwalForForgotPW(pwReset, setEmail), [pwReset]);

  return (
    <Wrapper>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={signInValidationSchema}
        onSubmit={(values, actions) => onSignInSubmit(values, actions, push, dispatch, signInWithEmailAndPW)}
      >
        {({
          isValid,
          isSubmitting,
        }) => {
          return (
            <SignContainer widthinrem={20}>
              <FormInnerWrapper>
                {signInList.map(({ label, type }) => (
                  <Field
                    key={label}
                    name={label}
                    type={type}
                    width={7}
                    receivedEmail={email}
                    setEmail={setEmail}
                    component={SimpleFormInput}
                  />
                ))}
              </FormInnerWrapper>
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                isLoading={isSubmitting}
                text='Sign In'
                height="3.5rem"
              />
              <BottomTextBtnContainer>
                <BottomTextButton
                  onClick={onClickSignUp}
                  value="Sign Up"
                />
                <BottomTextButton
                  right
                  onClick={onClickForgotPW}
                  value="Forgot password?"
                />
              </BottomTextBtnContainer>
            </SignContainer>
          );
        }}
      </Formik>
    </Wrapper>
  );
};
