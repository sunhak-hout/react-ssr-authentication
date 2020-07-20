import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './useAuth';
import { RequestProvider } from './useRequest';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from '../libs/theme';

const ContextProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CookiesProvider>
        <RequestProvider>
          <AuthProvider>{children}</AuthProvider>
        </RequestProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
};

export default ContextProvider;
