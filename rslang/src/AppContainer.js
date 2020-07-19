import React from 'react';
import './App.scss';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './App';

const AppContainer = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default AppContainer;
