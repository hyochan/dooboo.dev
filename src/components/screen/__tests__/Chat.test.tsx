import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import Chat from '../Chat';
import { render, fireEvent, getByTestId } from '@testing-library/react';

const props = {
  history: {
    goBack: jest.fn(),
  },
};

describe('[Chat] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Chat />).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Chat] Interaction', () => {
  const component = <Chat {...props} />;
  let renderResult: any;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('should simulate [onClick] when [btn] has been clicked', () => {
    const textInstance: any = renderResult.getByTestId('myText');
    expect(textInstance.textContent).toEqual('Chat');
  });
});
