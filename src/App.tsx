import React, { useContext } from 'react';
import { render, hydrate } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { AppProvider as Provider, AppContext } from './providers';
import SwitchNavigator from './components/navigation/SwitchNavigator';

const rootElement = document.getElementById('app') as HTMLElement;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#212121',
      main: '#212121',
      dark: '#212121',
    },
    secondary: {
      light: '#18202c',
      main: '#18202c',
      dark: '#18202c',
    },
  },
  overrides: {
    MuiDrawer: {
      paper: {
        background: '#212121',
        // this is where magic happens
        '& *': { color: 'rgba(255, 255, 255, 0.7)' },
      },
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
