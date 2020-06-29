import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './components/Header';
import Main from './components/Main';
import Unmess from './components/games/Unmess/App';

import store from './redux/store';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <Header />
        <Unmess />
      </div>
    </Router>
  </Provider>
);

export default App;
