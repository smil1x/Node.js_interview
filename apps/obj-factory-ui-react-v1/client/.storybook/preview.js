import React from 'react';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '../src/layout/App';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>{Story()}</SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </Router>
  ),
];
