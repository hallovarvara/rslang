import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import EnglishPuzzle from './components/EnglishPuzzle';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <EnglishPuzzle />
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
