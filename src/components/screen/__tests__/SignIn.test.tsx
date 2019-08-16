import React from 'react';
import { withRouter } from 'react-router';
import SignIn, { signInList } from '../SignIn';
import { getLabelCapitalize } from '../../shared/Input';
import { history, act, within, render, fireEvent, wait, waitForElement } from '../../../../test/test-utils';

const props = {
  history,
};

describe('[SignIn] render', () => {
  it('renders without crashing', () => {
    const component: any = render(<SignIn {...props} />);
    expect(component.firstChild).toMatchSnapshot();
  });
});

describe('[SignIn] Interaction', () => {
  let renderResult: any;

  const LocationDisplay = withRouter(({ location }) => (
    <div data-testid="location-display">{location.pathname}</div>
  ));

  beforeEach(() => {
    renderResult = render(
      <div>
        <SignIn {...props} />
        <LocationDisplay />
      </div>,
      { route: '/signin' }
    );
  });

  it('should simulate [onClick] when [btn] has been clicked', () => {
    const { getByText } = renderResult;
    const spy = jest.fn();
    const SignInSubmitBtn = getByText('Sign In').closest('button');
    SignInSubmitBtn.addEventListener('click', spy,);
    fireEvent.click(SignInSubmitBtn);
    expect(spy).toHaveBeenCalled();
  });

  it('testing moving to the home when successfully signed in.', () => {
    const { getByLabelText, getByText, getByTestId } = renderResult;
    const emailInput = getByLabelText(getLabelCapitalize(signInList[0].label));
    const pwInput = getByLabelText(getLabelCapitalize(signInList[1].label));
    const submitBtn = getByText('Sign In').closest('button');
    const locationComp = getByTestId('location-display');

    fireEvent.change(emailInput, { target: { value: 'hello@login.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(pwInput, { target: { value: 'hello@login.com' } });
    fireEvent.blur(pwInput);
    fireEvent.click(submitBtn);

    expect(locationComp.textContent).toEqual('/');
  });

  it('testing ReactSwal2 password forgot alert', async () => {
    window.scrollTo = () => {}; // for requirement of Swal2 test
    const { container, getByText, getByLabelText, debug } = renderResult;
    const emailInput = getByLabelText(getLabelCapitalize(signInList[0].label));
    const forgotPWBtn = getByText('Forgot password?');
    const wrapper = container.parentNode;

    fireEvent.click(forgotPWBtn);
    const Swal2 = wrapper.querySelector('.swal2-container');
    const swal2EmailInput = Swal2.querySelector('input[type="email"]');
    const swal2OKBtn = Swal2.querySelector('button.swal2-confirm');

    fireEvent.change(swal2EmailInput, { target: { value: 'test@test.com' } });
    fireEvent.click(swal2OKBtn);

    await wait(() => expect(wrapper.querySelector('#swal2-content').textContent).toMatch('a link for reset your password has been sent.'));

    const Swal2Confirm = wrapper.querySelector('.swal2-container');
    const swal2ConfirmOKBtn = Swal2Confirm.querySelector('button.swal2-confirm');
    fireEvent.click(swal2ConfirmOKBtn);

    await wait(() => expect(emailInput.value).toMatch('test@test.com'));
  });
});
