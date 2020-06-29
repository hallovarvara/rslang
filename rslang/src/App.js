import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';

import Header from './components/Header';
import Main from './components/Main';
import Unmess from './components/games/Unmess/App';

const reducer = (state = 0, action) => state;

const store = createStore(reducer);
console.log(store.getState());

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Unmess />
      </div>
    </Router>
  );
}

export default App;
