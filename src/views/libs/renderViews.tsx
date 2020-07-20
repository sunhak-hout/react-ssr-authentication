import { ServerStyleSheets } from '@material-ui/core';
import AppRouter from '../AppRouter';
import React, { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import ContextProvider from '../contexts';

export const renderViews = () => {
  const sheets = new ServerStyleSheets();
  const html = renderToString(
    sheets.collect(
      createElement(() => (
        <ContextProvider>
          <StaticRouter>
            <AppRouter />
          </StaticRouter>
        </ContextProvider>
      )),
    ),
  );
  const css = sheets.toString();
  return renderFullPage(html, css);
};

function renderFullPage(html: string, css: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <title>My page</title>
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
      <script type="text/javascript" src="/bundle.js"></script>
    </html>
  `;
}
