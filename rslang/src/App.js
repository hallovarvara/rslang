import React from 'react';
import './App.scss';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/Header';
import Main from './components/Main';

import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Header />
        <Main />
      </div>
    </Router>
  </Provider>
);

export default App;
