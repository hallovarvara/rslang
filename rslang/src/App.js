import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';

import Header from './components/Header';
import Main from './components/Main';
// import LearnWords from './components/pages/LearnWords';
// import response from './components/pages/LearnWords/helpers/response.json';

const reducer = (state = 0, action) => state;

const store = createStore(reducer);
console.log(store.getState());

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Main />
    </div>
  </Router>
);

export default App;
