import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App'; // TODO delete comment
import AudioCall from './components/AudioCallGame';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AudioCall />
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
