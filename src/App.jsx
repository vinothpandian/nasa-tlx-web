import React from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';
import { store } from './store';

import CookieConsent, { Cookies } from 'react-cookie-consent';


export default () => (
  <Provider store={store}>
    <React.Fragment>
      <Routes />
      <CookieConsent>This website uses Firebase to store data and authenticate users. It uses cookies to preserve user authentication.</CookieConsent>
    </React.Fragment>
  </Provider>
);
