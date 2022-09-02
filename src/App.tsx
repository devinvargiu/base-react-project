import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store, { loginError } from './store';
import { WithTranslation, withTranslation } from 'react-i18next';
import AppError from './utils/error';
import { serializeError } from 'serialize-error';
import AppRouter from './components/AppRouter';

// handle auth error on api calls
const dispatchAuthError = (error: AppError) => {
  if (error.code === 401) {
    store.dispatch(loginError(serializeError(error)));
  }
};

// Api.onError(dispatchAuthError);

class App extends Component<WithTranslation> {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="App">
            <AppRouter />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default withTranslation()(App);
