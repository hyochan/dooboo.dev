import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import SignUp from '../SignUp';
import { render, fireEvent, getByTestId } from '@testing-library/react';

const props = {
  history: {
    goBack: jest.fn(),
  },
};

describe('[SignUp] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<SignUp />).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[SignUp] Interaction', () => {
  const component = <SignUp {...props} />;
  let renderResult: any;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('should simulate [onClick] when [btn] has been clicked', () => {
    const textInstance: any = renderResult.getByTestId('myText');
    expect(textInstance.textContent).toEqual('Sign Up');
  });
});
