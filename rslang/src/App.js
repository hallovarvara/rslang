import React from 'react';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';

import Header from './Components/Header';
import Main from './Components/Main';
import LearnWords from './Components/Pages/LearnWords';
import response from './Components/Pages/LearnWords/helpers/response.json';

const reducer = (state = 0, action) => state;

const store = createStore(reducer);
console.log(store.getState());

function App() {
  return (
    // <Router>
    //   <div className='App'>
    //     <Header />
    //     <Main />
    //   </div>
    // </Router>
    <LearnWords data={response} />
  );
}

export default App;
