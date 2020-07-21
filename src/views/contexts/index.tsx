import {
  createGenerateClassName,
  CssBaseline,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { theme } from '../libs/theme';
import { AuthProvider } from './useAuth';
import { RequestProvider } from './useRequest';

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
  disableGlobal: true,
});

const ContextProvider: React.FC = ({ children }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CookiesProvider>
          <RequestProvider>
            <AuthProvider>{children}</AuthProvider>
          </RequestProvider>
        </CookiesProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default ContextProvider;
