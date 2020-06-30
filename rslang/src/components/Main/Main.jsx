import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from '../pages/Main';
import SettingsPage from '../pages/Settings';
import StatisticPage from '../pages/Statistic';
import TeamPage from '../pages/Team';
import PromoPage from '../pages/Promo';

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/statistic" component={StatisticPage} />
      <Route path="/team" component={TeamPage} />
      <Route path="/promo" component={PromoPage} />
    </Switch>
  </main>
);

export default Main;