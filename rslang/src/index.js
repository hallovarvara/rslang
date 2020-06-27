import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import AudioCall from './Components/AudioCallGame';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AudioCall />
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
