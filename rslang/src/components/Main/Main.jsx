import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from '../pages/Main';
import SettingsPage from '../pages/Settings';
import StatisticPage from '../pages/Statistic';
import TeamPage from '../pages/Team';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/settings' component={SettingsPage} />
      <Route path='/statistic' component={StatisticPage} />
      <Route path='/team' component={TeamPage} />
    </Switch>
  </main>
);

export default Main;
