import React from 'react';
import { Router } from 'react-router-dom';
import { render, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { createMemoryHistory } from 'history'

import { AppProvider as Provider } from '../src/providers';
import { createTheme } from '../src/theme';

const getById = queryByAttribute.bind(null, 'id');

const historyObj = createMemoryHistory();

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={createTheme()}>
      {children}
    </ThemeProvider>
  )
}

function renderWithRouter(
  ui,
  {
    route = '/',
    history = historyObj,
  } = {},
  options?
) {
  return {
    ...render(
      <Provider isTest>
        <Router history={history}>{ui}</Router>
      </Provider>,
      { wrapper: AllTheProviders, ...options }
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
} 

// re-export everything
export * from '@testing-library/react'

// override render method
export { renderWithRouter as render, getById, userEvent, historyObj as history }