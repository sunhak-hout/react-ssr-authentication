import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';
import ContextProvider from './contexts';

const App: React.FC = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ContextProvider>
  );
};

render(<App />, document.querySelector('#app'));
