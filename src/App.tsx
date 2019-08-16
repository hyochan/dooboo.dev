import React from 'react';
import { render, hydrate } from 'react-dom';

import { AppProvider as Provider } from './providers';
import SwitchNavigator from './components/navigation/SwitchNavigator';
import GlobalStyle from './utils/GlobalStyle';

const rootElement = document.getElementById('app') as HTMLElement;

const Component = () => (
  <Provider>
    <GlobalStyle />
    <SwitchNavigator />
  </Provider>
);

const renderApp = () => {
  if (rootElement.hasChildNodes()) {
    hydrate(<Component />, rootElement);
  } else {
    render(<Component />, rootElement);
  }
};

renderApp();

if (module.hot) module.hot.accept(['./components/navigation/SwitchNavigator'], () => renderApp());
