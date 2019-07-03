import React, { useContext } from 'react';
import { render, hydrate } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { AppProvider as Provider, AppContext } from './providers';
import SwitchNavigator from './components/navigation/SwitchNavigator';

const rootElement = document.getElementById('app') as HTMLElement;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6772E5',
      main: '#6772E5',
      dark: '#6772E5',
    },
    secondary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
    },
  },
});

const Component = () => (
  <MuiThemeProvider theme={theme}>
    <Provider>
      <SwitchNavigator />
    </Provider>
  </MuiThemeProvider>
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
