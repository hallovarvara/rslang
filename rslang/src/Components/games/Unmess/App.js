import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';

import StartPage from './components/pages/Start';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact parh="/" render={() => <StartPage />} />
      </Switch>
    )
  }
}

export default App;
