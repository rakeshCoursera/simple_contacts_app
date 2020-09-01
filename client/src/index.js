import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { ConnectedRouter } from 'connected-react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import configureStore, { history } from './redux/store';
import AppRoutes from './routes';
import theme from './theme';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store} context={ReactReduxContext}>
      <CookiesProvider>
        <ConnectedRouter history={history} context={ReactReduxContext}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <AppRoutes />
          </ThemeProvider>
        </ConnectedRouter>
      </CookiesProvider>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));


