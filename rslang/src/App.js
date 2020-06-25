import React from 'react';
import './App.scss';
// import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';

// import Header from './Components/Header';
// import Main from './Components/Main';
import AudioCall from './Components/AudioCallGame';

const reducer = (state = 0, action) => state;

const store = createStore(reducer);
console.log(store.getState());

function App() {
  return (
    <AudioCall />
    // <Router>
    //   <div className='App'>
    //     <Header />
    //     <Main />
    //   </div>
    // </Router>
  );
}

export default App;
