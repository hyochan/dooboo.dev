import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import FindPw from '../FindPw';
import { render, fireEvent, getByTestId } from '@testing-library/react';

const props = {
  history: {
    goBack: jest.fn(),
  },
};

describe('[FindPw] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<FindPw />).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[FindPw] Interaction', () => {
  const component = <FindPw {...props} />;
  let renderResult: any;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('should simulate [onClick] when [btn] has been clicked', () => {
    const textInstance: any = renderResult.getByTestId('myText');
    expect(textInstance.textContent).toEqual('Find Pw');
  });
});
