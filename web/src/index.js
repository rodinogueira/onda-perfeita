import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { AppProviders } from './context';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
