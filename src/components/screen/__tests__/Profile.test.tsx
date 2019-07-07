import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import Profile from '../Profile';
import { render, fireEvent, getByTestId } from '@testing-library/react';

const props = {
  history: {
    goBack: jest.fn(),
  },
};

describe('[Profile] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Profile />).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Profile] Interaction', () => {
  const component = <Profile {...props} />;
  let renderResult: any;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('should simulate [onClick] when [btn] has been clicked', () => {
    const textInstance: any = renderResult.getByTestId('myText');
    expect(textInstance.textContent).toEqual('Profile');
  });
});
