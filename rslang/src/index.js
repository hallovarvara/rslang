import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App'; // TODO delete comment
import EnglishPuzzle from './components/EnglishPuzzle';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <EnglishPuzzle />
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
