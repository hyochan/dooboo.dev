import React from 'react';
import { Formik, Form, Field } from 'formik';

import { SimpleFormInput, getLabelCapitalize } from '../Input';
import { signInList, signInValidationSchema } from '../../screen/SignIn';
import { render, fireEvent, wait, waitForElement } from '../../../../test/test-utils';

describe('[SimpleFormInput] render', () => {
  it('renders without crashing', () => {
    const component: any = render(
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={signInValidationSchema}
        onSubmit={() => jest.fn()}
      >
        <Form>
          {signInList.map(({ label, type }) => (
            <Field
              key={label}
              name={label}
              type={type}
              width={7}
              component={SimpleFormInput}
            />
          ))}
        </Form>
      </Formik>
    );
    expect(component.firstChild).toMatchSnapshot();
  });
});

describe('[SimpleFormInput] interaction', () => {
  const component =
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={signInValidationSchema}
      onSubmit={() => jest.fn()}
    >
      <Form>
        {signInList.map(({ label, type }) => (
          <Field
            key={label}
            name={label}
            type={type}
            width={7}
            component={SimpleFormInput}
          />
        ))}
      </Form>
    </Formik>;

  let renderResult: any;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('getLabelCapitalize func works as designed.', async () => {
    const { getByTestId } = renderResult;
    const labelEmail = getByTestId(`label-${signInList[0].label}`);
    expect(labelEmail.textContent).toBe(getLabelCapitalize(signInList[0].label));
  });

  it('ErrorMessage displays as intended: SignIn email and password.', async () => {
    const { findByTestId, getByLabelText } = renderResult;
    const inputEmail = getByLabelText(getLabelCapitalize(signInList[0].label));
    fireEvent.change(inputEmail, { target: { value: 'hello' } });
    fireEvent.blur(inputEmail);
    const emailErrorMsg = await findByTestId(`errors-${signInList[0].label}`);
    expect(emailErrorMsg.textContent).toBe('email must be a valid email');

    const inputPW = getByLabelText(getLabelCapitalize(signInList[1].label));
    fireEvent.change(inputPW, { target: { value: '' } });
    fireEvent.blur(inputPW);
    const pwErrorMsg = await findByTestId(`errors-${signInList[1].label}`);
    expect(pwErrorMsg.textContent).toBe('password is required');

    fireEvent.change(inputPW, { target: { value: 'hello' } });
    await wait(() => expect(pwErrorMsg.textContent).toBe('password must be at least 6 characters.'));
  });
});
