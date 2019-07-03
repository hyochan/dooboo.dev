import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import SignIn from '../SignIn';
import { render, fireEvent, getByTestId } from '@testing-library/react';

const props = {
  history: {
    goBack: jest.fn(),
  },
};

describe('[SignIn] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<SignIn />).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[SignIn] Interaction', () => {
  const component = <SignIn {...props} />;
  let renderResult: any;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('should simulate [onClick] when [btn] has been clicked', () => {
    const textInstance: any = renderResult.getByTestId('myText');
    expect(textInstance.textContent).toEqual('Sign In');
  });
});
