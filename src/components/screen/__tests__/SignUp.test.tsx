import React from 'react';
import { withRouter } from 'react-router';

import SignUp, { signUpList } from '../SignUp';
import { getLabelCapitalize } from '../../shared/Input';
import { history, within, render, fireEvent, wait, waitForElement } from '../../../../test/test-utils';

const props = {
  history,
};

describe('[SignUp] render', () => {
  it('renders without crashing', () => {
    const component: any = render(<SignUp {...props} />);
    expect(component.firstChild).toMatchSnapshot();
  });
});

describe('[SignUp] Interaction', () => {
  let renderResult: any;

  const LocationDisplay = withRouter(({ location: { pathname, state } }) => {
    let email = '';
    if (state) {
      ({ email } = state);
    }
    return (
      <>
        <div data-testid="location-display">{pathname}</div>
        <span data-testid="location-state-email">{email}</span>
      </>
    );
  });

  beforeEach(() => {
    renderResult = render(
      <div>
        <SignUp {...props} />
        <LocationDisplay />
      </div>,
      { route: '/signup' }
    );
  });

  it('should simulate [onClick] when [btn] has been clicked', () => {
    const { getByText } = renderResult;
    const spy = jest.fn();
    const SignUpSubmitBtn = getByText('Sign Up').closest('button');
    SignUpSubmitBtn.addEventListener('click', spy,);
    fireEvent.click(SignUpSubmitBtn);
    expect(spy).toHaveBeenCalled();
  });

  it('testing moving to the home when successfully signed up.', async () => {
    window.scrollTo = () => {}; // for requirement of Swal2 test
    const { container, debug, getByLabelText, getByText, getByTestId } = renderResult;
    const wrapper = container.parentNode;
    const emailInput = getByLabelText(getLabelCapitalize(signUpList[0].label));
    const pwInput = getByLabelText(getLabelCapitalize(signUpList[1].label));
    const pwInput2 = getByLabelText(getLabelCapitalize(signUpList[2].label));
    const submitBtn = getByText('Sign Up').closest('button');

    fireEvent.change(emailInput, { target: { value: 'hello@signup.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(pwInput, { target: { value: 'hello@signup.com' } });
    fireEvent.blur(pwInput);
    fireEvent.change(pwInput2, { target: { value: 'hello@signup.com' } });
    fireEvent.blur(pwInput2);
    fireEvent.click(submitBtn);

    const Swal2 = await waitForElement(() => wrapper.querySelector('.swal2-container'));
    const Swal2OKBtn = within(Swal2).getByText('OK');

    fireEvent.click(Swal2OKBtn);

    const locationComp = await waitForElement(() => getByTestId('location-display'));
    const locationStateEmail = await waitForElement(() => getByTestId('location-state-email'));
    expect(locationComp.textContent).toBe('/signin');
    expect(locationStateEmail.textContent).toBe('hello@signup.com');
  });

  /* it('see what happens when click "Sign In" button', async () => {
    window.scrollTo = () => {}; // for requirement of Swal2 test
    const { container, getByText } = renderResult;
    const forgotPWBtn = getByText('Forgot password?');
    const wrapper = await waitForElement(() => container.parentNode);
    fireEvent.click(forgotPWBtn);
    const Swal2 = wrapper.querySelector('.swal2-container');
    const swal2EmailInput = Swal2.querySelector('input[type="email"]');
    const swal2OKBtn = Swal2.querySelector('button.swal2-confirm');
    fireEvent.change(swal2EmailInput, { target: { value: 'test@test.com' }});
    fireEvent.click(swal2OKBtn);
    await wait(() => expect(wrapper.querySelector('#swal2-content').textContent).toMatch('a link for reset your password has been sent.'));

    const { container, debug, getByText } = renderResult;
    const moveToSignInBtn = getByText('Sign In');
    debug(moveToSignInBtn);
  }); */
});
