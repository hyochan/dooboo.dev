import React from 'react';
import * as renderer from 'react-test-renderer';

import Temp from '../Temp';
import { render, fireEvent, getByTestId } from '@testing-library/react';

const props = {
  history: {
    goBack: jest.fn(),
  },
};

describe('[Temp] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<Temp />).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Temp] Interaction', () => {
  const component = <Temp {...props} />;
  let renderResult: any;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('should simulate [onClick] when [btn] has been clicked', () => {
    const btnInstance = renderResult.getByText('back to tab page');
    fireEvent.click(btnInstance);
    expect(props.history.goBack).toHaveBeenCalledTimes(1);
  });
});
